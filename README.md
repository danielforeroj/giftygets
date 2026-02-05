# GiftyGets

Next.js App Router starter for an alerts product with a clear split between public marketing surfaces and authenticated app routes.

## Structure

- `src/app/(marketing)` public pages (`/`, `/pricing`).
- `src/app/(app)` authenticated pages (`/app`, `/app/dashboard`).
- `src/app/api/health` health endpoint.
- `src/lib/auth/requireUser.ts` temporary auth guard to be replaced by NextAuth session checks.
- `prisma/schema.prisma` Postgres schema with baseline entities for auth, trackers, check runs, alerts, and agent traces.

## Environment

Copy `.env.local.example` to `.env.local`.

- `DATABASE_URL`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `AUTH_BYPASS` (`true` for local mocked auth)

## Commands

```bash
pnpm install
pnpm prisma:migrate
pnpm dev
pnpm lint
pnpm test
```

## MVP review checklist

- [x] Structure is clear and route-grouped for marketing vs app pages.
- [x] Auth guard boundary exists in one place (`requireUser`) so real NextAuth can plug in without rewriting layouts.
- [x] Environment variables are documented and secrets are not committed.
- [x] No server-only modules are imported into client components.
