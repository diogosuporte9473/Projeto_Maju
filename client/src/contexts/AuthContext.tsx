import { trpc } from "@/lib/trpc";
import { supabase } from "@/lib/supabase";
import { createContext, useContext, useEffect, useState, useMemo, ReactNode } from "react";
import type { User } from "@shared/types";

type AuthContextType = {
  user: User | null;
  session: any | null;
  loading: boolean;
  error: any | null;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<any>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<any>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const utils = trpc.useUtils();

  useEffect(() => {
    // Initial session check with timeout
    const checkSession = async () => {
      const timeout = setTimeout(() => {
        if (sessionLoading) {
          console.warn("[Auth] Session check timed out");
          setSessionLoading(false);
        }
      }, 5000);

      try {
        const { data: { session } } = await supabase.auth.getSession();
        setSession(session);
      } catch (error) {
        console.error("[Auth] Error getting session", error);
      } finally {
        clearTimeout(timeout);
        setSessionLoading(false);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
      setSession(session);
      if (session) {
        utils.auth.me.invalidate();
      }
    });

    return () => subscription.unsubscribe();
  }, [utils]);

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!session,
  });

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
      setSession(null);
    } catch (error: unknown) {
      console.error("[Auth] Logout failed", error);
    }
  };

  const value = useMemo(() => {
    return {
      user: meQuery.data ?? null,
      session,
      loading: sessionLoading || (meQuery.isLoading && !!session),
      error: meQuery.error ?? null,
      isAuthenticated: Boolean(session),
      logout,
      refresh: () => meQuery.refetch(),
    };
  }, [meQuery.data, meQuery.error, meQuery.isLoading, session, sessionLoading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}
