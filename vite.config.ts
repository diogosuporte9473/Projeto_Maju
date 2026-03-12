import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "node:path";
import { defineConfig, loadEnv } from "vite";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig(({ mode }) => {
  // Carrega variáveis de ambiente para uso no config, se necessário
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client/src"),
      },
    },
    // Define fallbacks para evitar que o Rollup quebre se a variável estiver ausente
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(env.VITE_SUPABASE_URL || ''),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(env.VITE_SUPABASE_ANON_KEY || ''),
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        // Ativa logs detalhados para identificar exatamente qual arquivo/variável causa o erro
        onwarn(warning, warn) {
          console.warn('Rollup Warning:', warning.message);
          if (warning.loc) {
            console.warn(`File: ${warning.loc.file}:${warning.loc.line}:${warning.loc.column}`);
          }
          warn(warning);
        },
      },
    },
  };
});
