const getEnv = (key: string, defaultValue: string = "") => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    console.warn(`[ENV] Warning: Environment variable ${key} is not set.`);
  }
  return value ?? defaultValue;
};

export const ENV = {
  databaseUrl: getEnv("DATABASE_URL"),
  ownerOpenId: getEnv("OWNER_OPEN_ID"),
  isProduction: process.env.NODE_ENV === "production",
  supabaseUrl: getEnv("VITE_SUPABASE_URL"),
  supabaseServiceKey: getEnv("SUPABASE_SERVICE_ROLE_KEY"),
};
