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
    root: '.', // Força raiz como o diretório atual
    base: '/', // Importante para Vercel
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client/src"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
    // Define fallbacks inteligentes: tenta VITE_, depois NEXT_PUBLIC_, depois a var pura
    define: {
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
        env.VITE_SUPABASE_URL || env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL || ''
      ),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
        env.VITE_SUPABASE_ANON_KEY || env.NEXT_PUBLIC_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY || ''
      ),
      'import.meta.env.VITE_APP_ENV': JSON.stringify(env.VITE_APP_ENV || 'production'),
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || ''),
    },
    build: {
      outDir: "dist",
      emptyOutDir: true,
      rollupOptions: {
        // Ativa logs detalhados solicitados para depuração na Vercel
        onwarn(warning, warn) {
          console.warn('=== ROLLUP WARNING DETALHADO ===');
          console.warn('Código do warning:', warning.code);
          console.warn('Mensagem:', warning.message);
          if (warning.loc) {
            console.warn(`Arquivo: ${warning.loc.file || 'desconhecido'}`);
            console.warn(`Linha: ${warning.loc.line}:${warning.loc.column}`);
          }
          if (warning.exporter) console.warn('Exporter:', warning.exporter);
          if (warning.importer) console.warn('Importer:', warning.importer);
          console.warn('===========================');
          warn(warning);
        },
      },
    },
    server: {
      open: true,
    },
  };
});
