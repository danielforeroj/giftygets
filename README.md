# Gifty Gets MVP

## Local setup

1. Install deps:
   - `corepack enable && pnpm install`
2. Run Prisma client generation:
   - `pnpm prisma:generate`
3. Run database migrations in development:
   - `pnpm prisma:migrate`
4. Run web app:
   - `pnpm dev`
5. Run worker + scheduler loop:
   - `pnpm worker`

## Production deploy (Render)

Use `render.yaml` to create:
- web service (`pnpm start`)
- worker service (`pnpm worker`)

`render.yaml` already enables Corepack and pins pnpm (`pnpm@9.15.3`) for reliable builds.

Set `DATABASE_URL` for both the web service and the worker service.

## Admin promotion

Promote a user to admin:
- `pnpm make-admin you@example.com`

## Quality checks

- Lint: `pnpm lint`
- Unit tests: `pnpm test`
- Build: `pnpm build`
