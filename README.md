# AI EA Alerts Agent (Gifty Gets MVP)

MVP combines a playful frontend with deterministic alert guarantees:
- no alert without deterministic verification
- schema-validated agent plans with fallback path
- allowlist + safeFetch gate
- observable traces for plans/tool execution

## Setup

1. Copy env file:
```bash
cp .env.local.example .env.local
```
2. Install dependencies:
```bash
pnpm install
```
3. Run migrations:
```bash
pnpm prisma:migrate
```
4. Start app:
```bash
pnpm dev
```
5. Start worker (separate terminal):
```bash
pnpm worker
```

## Commands

```bash
pnpm lint
pnpm test
pnpm eval
```

## Main routes
- Marketing: `/`, `/pricing`, `/privacy`, `/terms`
- App: `/app/dashboard`, `/app/trackers`, `/app/settings`, `/app/billing`
- Admin: `/admin/checks`, `/admin/checks/[id]`, `/admin/adapters`

## Guarantees implemented
- Deterministic alert gate (`src/server/verifiers/alertGate.ts`)
- Plan schema + fallback (`src/server/agent/planSchema.ts`, `src/server/agent/validatePlan.ts`)
- Allowlist and safe fetch (`src/server/policy/domainAllowlist.ts`, `src/server/http/safeFetch.ts`)
- Trace logging (`src/server/agent/trace.ts`, `src/server/logging/logger.ts`)
- Eval scenarios (`src/eval/scenarios/*`)
