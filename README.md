# Gifty Gets MVP

## Local setup

1. Install deps:
   - `pnpm install`
2. Run database migrations in development:
   - `pnpm prisma migrate dev`
3. Run web app:
   - `pnpm dev`
4. Run worker + scheduler loop:
   - `pnpm worker`

## Production deploy (Render)

Use `render.yaml` to create:
- web service (`pnpm start`)
- worker service (`pnpm worker`)

## Admin promotion

Promote a user to admin:
- `pnpm make-admin you@example.com`

## Quality checks

- Lint: `pnpm lint`
- Unit tests: `pnpm test`
- Eval scenarios: `pnpm eval`
