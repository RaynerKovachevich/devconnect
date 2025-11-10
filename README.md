# DevConnect

DevConnect is a full-stack playground for a developer networking platform. The repo hosts a type-safe Express API (JWT + Prisma) and a polished React + Vite single-page client featuring a marketing landing, authentication, dashboard insights, and a profile editor backed by local storage.

## Repository structure

- `backend/` – Express + TypeScript REST API with Prisma ORM, JWT auth, Swagger docs, and Docker setup.
- `frontend/` – React 19 + Vite SPA with protected routes, reusable UI kit, and responsive layouts.

## Features at a glance

- **Authentication** – Email/password register & login, JWT issuance, auth middleware, protected routes on the client.
- **User management** – `/users` CRUD endpoints, `/users/me` profile fetch, Prisma migrations and seed helpers.
- **Developer experience** – Swagger UI (`/docs`), Jest + Supertest smoke tests, centralized error handling.
- **Client experience** – Marketing landing page, auth layout with storytelling panel, dashboard analytics, profile editor with local persistence.
- **DevOps ready** – Docker Compose for API + Postgres, environment templates, production build scripts.

## Tech stack

| Layer | Highlights |
| ----- | ---------- |
| Frontend | React 19, TypeScript, React Router 7, Vite 7, ESLint/Prettier |
| Backend | Express 5, TypeScript, Prisma, PostgreSQL, JWT, ts-node-dev |
| Tooling | Docker, Jest + Supertest (API), Vitest-ready config, ESLint |

## Quick start

Prerequisites: Node.js 20+, npm 10+, Docker Desktop (optional but recommended for Postgres).

> All commands below assume Windows PowerShell. Adjust paths if you use a different shell.

### 1. Backend API

```powershell
cd backend
npm install
Copy-Item .env.example .env
# optional: spin up Postgres locally
cd ..\backend\docker
docker compose up -d
cd ..
# run migrations (expects DATABASE_URL in .env)
npx prisma migrate deploy
# start the API with hot reload
npm run dev
```

- Local dev server: `http://localhost:5001`
- Swagger UI: `http://localhost:5001/docs`

### 2. Frontend SPA

In a second terminal:

```powershell
cd frontend
npm install
npm run dev
```

- Vite dev server: `http://localhost:5173`
- Default API base: `http://localhost:5000` (configurable via `VITE_API_BASE`)

Log in or sign up with any credentials; the token is stored in `localStorage` to unlock the dashboard and profile routes.

## Running everything with Docker

```powershell
cd backend
npm run docker:up
```

- API available at `http://localhost:5000`
- Postgres persists data in the `pgdata` Docker volume
- Stop the stack: `docker compose -f docker/docker-compose.yml down`

## Environment variables

| Location | Variable | Purpose |
| -------- | -------- | ------- |
| `backend/.env` | `PORT` | Express listen port (default `5001`) |
| | `DATABASE_URL` | Prisma connection string (matches Compose defaults) |
| | `JWT_SECRET` | Secret for signing JWT access tokens |
| | `JWT_EXPIRES_IN` | Optional token TTL override |
| `frontend/.env` (optional) | `VITE_API_BASE` | Override API base URL used by fetch helpers |

## Useful npm scripts

| Workspace | Command | Description |
| --------- | ------- | ----------- |
| backend | `npm run dev` | Start Express with ts-node-dev |
| | `npm run build` / `npm start` | Compile to `dist/` and run in production mode |
| | `npm test` | Run Jest + Supertest API tests |
| | `npm run prisma:generate` | Regenerate Prisma client |
| | `npm run seed` | Execute `prisma/seed.ts` |
| frontend | `npm run dev` | Start Vite dev server |
| | `npm run build` | Type-check then build static assets |
| | `npm run preview` | Preview prod build |
| | `npm run lint` | Run ESLint |

## API overview

| Method | Path | Notes |
| ------ | ---- | ----- |
| `POST` | `/auth/register` | Create user, returns JWT and public user payload |
| `POST` | `/auth/login` | Authenticate user, returns JWT and public user |
| `GET` | `/users` | List sanitized users |
| `GET` | `/users/:id` | Fetch user by ID |
| `GET` | `/users/me` | Requires `Authorization: Bearer <token>` |
| `POST` | `/users` | Create user (admin bootstrap) |
| `PUT` | `/users/:id` | Update user, hashes new password if provided |
| `DELETE` | `/users/:id` | Admin-only deletion |
| `GET` | `/health` | Health probe for uptime/compose |

OpenAPI documentation lives in `backend/docs/openapi.yaml` and is exposed via Swagger UI.

## Frontend tour

- `src/App.tsx` centralizes routes and auth guards.
- `src/pages/Login.tsx` and `src/pages/Register.tsx` share `AuthLayout` with a storytelling showcase, responsive on mobile.
- `src/pages/Dashboard.tsx` presents stat cards, progress meters, quick actions, and a mocked timeline.
- `src/pages/Profile.tsx` implements a local-storage backed profile editor with live preview and draft status.
- UI atoms live under `src/components/ui/` (buttons, inputs, hero visuals) and global styles in `src/index.css`.

## Testing & quality gates

- Backend: `npm test` runs Jest + Supertest (currently covers health check; extend with more cases).
- Frontend: `npm run lint` enforces code style; project is configured for Vitest if you add specs.
- Recommended manual checks: complete auth flow, verify dashboard CTA navigation, update/reset profile and refresh to confirm persistence.

## Roadmap ideas

- Persist profile data through API endpoints and replace localStorage stubs.
- Introduce refresh tokens and role-based guards beyond admin-only deletes.
- Add notification/toast system for global feedback on the client.
- Expand automated test coverage (API + component tests) and wire up CI.

---

Need a quick start? Copy the sections above into your GitHub README or tailor them to your team’s workflow.
