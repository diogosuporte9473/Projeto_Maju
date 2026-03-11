import { createClient } from "@supabase/supabase-js";
import { AXIOS_TIMEOUT_MS, COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import { ForbiddenError } from "@shared/_core/errors";
import axios, { type AxiosInstance } from "axios";
import type { Request } from "express";
import type { User } from "../../drizzle/schema";
import * as db from "../db";
import { ENV } from "./env";

const supabase = createClient(ENV.supabaseUrl, ENV.supabaseServiceKey);

// Utility function
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value.length > 0;

class SDKServer {
  private readonly client: AxiosInstance;

  constructor(client: AxiosInstance = axios.create()) {
    this.client = client;
  }

  async authenticateRequest(req: any): Promise<User> {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw ForbiddenError("Missing authorization token");
    }

    try {
      const { data: { user: supabaseUser }, error } = await supabase.auth.getUser(token);

      if (error || !supabaseUser) {
        throw ForbiddenError("Invalid session");
      }

      const openId = supabaseUser.id;
      const signedInAt = new Date();
      let user = await db.getUserByOpenId(openId);

      if (!user) {
        await db.upsertUser({
          openId,
          name: supabaseUser.user_metadata?.full_name || supabaseUser.email?.split("@")[0] || "User",
          email: supabaseUser.email ?? null,
          loginMethod: "supabase",
          lastSignedIn: signedInAt,
        });
        user = await db.getUserByOpenId(openId);
      } else {
        await db.upsertUser({
          openId,
          lastSignedIn: signedInAt,
        });
      }

      if (!user) {
        throw ForbiddenError("User not found after sync");
      }

      return user;
    } catch (error) {
      console.error("[Auth] Supabase verification failed", error);
      throw ForbiddenError("Authentication failed");
    }
  }
}

export const sdk = new SDKServer();
