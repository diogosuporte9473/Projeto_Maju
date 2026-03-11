# Trello Maju Clone

Clone do Trello customizado para Maju Personalizados.

## Setup de Variáveis de Ambiente (Vercel)

Para que o projeto funcione corretamente na Vercel, você precisa configurar as seguintes variáveis de ambiente no dashboard do projeto (**Settings > Environment Variables**).

### Variáveis do Cliente (Vite)
*Devem começar com `VITE_` para serem expostas ao navegador.*

- `VITE_SUPABASE_URL`: URL do projeto Supabase.
- `VITE_SUPABASE_ANON_KEY`: Chave anônima (anon key) do Supabase.

### Variáveis do Servidor (Node.js)

- `DATABASE_URL`: URL de conexão direta com o banco de dados PostgreSQL do Supabase.
- `SUPABASE_SERVICE_ROLE_KEY`: Chave de serviço (service_role) do Supabase para validação no backend.
- `JWT_SECRET`: Segredo para segurança interna.
- `OWNER_OPEN_ID`: ID do usuário (UUID do Supabase) que será o administrador principal.
- `BUILT_IN_FORGE_API_URL`: (Opcional) URL da API Forge.
- `BUILT_IN_FORGE_API_KEY`: (Opcional) Chave da API Forge.

## Desenvolvimento Local

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Configure o arquivo `.env` com as variáveis acima.
3. Inicie o servidor de desenvolvimento:
   ```bash
   pnpm dev
   ```

## Build de Produção

```bash
pnpm build
```
O build gera os arquivos estáticos do cliente em `dist/public` e o servidor bundle em `dist/index.js`.
