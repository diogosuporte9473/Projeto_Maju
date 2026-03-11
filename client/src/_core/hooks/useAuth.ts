import { trpc } from "@/lib/trpc";
import { supabase } from "@/lib/supabase";
import { TRPCClientError } from "@trpc/client";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { User } from "@shared/types"; // Adjust this import based on your actual user type

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false } = options ?? {};
  const utils = trpc.useUtils();
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      utils.auth.me.invalidate();
    });

    return () => subscription.unsubscribe();
  }, [utils]);

  const meQuery = trpc.auth.me.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!session,
  });

  const logout = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      utils.auth.me.setData(undefined, null);
      await utils.auth.me.invalidate();
    } catch (error: unknown) {
      console.error("[Auth] Logout failed", error);
    }
  }, [utils]);

  const state = useMemo(() => {
    return {
      user: meQuery.data ?? null,
      loading: meQuery.isLoading && !!session,
      error: meQuery.error ?? null,
      isAuthenticated: Boolean(session),
    };
  }, [meQuery.data, meQuery.error, meQuery.isLoading, session]);

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (state.loading) return;
    if (state.isAuthenticated) return;
    if (typeof window === "undefined") return;

    // No redirection here, usually Home.tsx handles the unauthenticated view
  }, [redirectOnUnauthenticated, state.loading, state.isAuthenticated]);

  return {
    ...state,
    refresh: () => meQuery.refetch(),
    logout,
  };
}
