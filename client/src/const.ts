export { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";

// Add any project-specific constants here
export const APP_NAME = "Maju Tasks";
export const DEFAULT_BOARD_COLOR = "#4b4897";

export function getLoginUrl() {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "";
  return `${supabaseUrl}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(window.location.origin)}`;
}
