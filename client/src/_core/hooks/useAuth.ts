import { useAuthContext } from "@/contexts/AuthContext";
import { useEffect } from "react";

type UseAuthOptions = {
  redirectOnUnauthenticated?: boolean;
};

export function useAuth(options?: UseAuthOptions) {
  const { redirectOnUnauthenticated = false } = options ?? {};
  const auth = useAuthContext();

  useEffect(() => {
    if (!redirectOnUnauthenticated) return;
    if (auth.loading) return;
    if (auth.isAuthenticated) return;
    if (typeof window === "undefined") return;

    // Redirection logic can be added here if needed, 
    // but usually Home.tsx handles the view.
  }, [redirectOnUnauthenticated, auth.loading, auth.isAuthenticated]);

  return auth;
}
