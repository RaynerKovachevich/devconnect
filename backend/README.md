# DevConnect Backend

Type-safe Express backend for DevConnect with JWT auth and Prisma.

What this repo contains
- Express + TypeScript API (clean controller/service layout)
- Prisma ORM backed by PostgreSQL (via `docker/docker-compose.yml`)
- JWT authentication with bcrypt password hashing
- OpenAPI spec in `docs/openapi.yaml` rendered through Swagger UI (`/docs`)
- Containerized runtime with Dockerfile + Docker Compose

Quick start (Windows PowerShell)
1. Install dependencies

```powershell
npm install
```

2. Ensure the database is available (e.g. `docker compose up -d` from the repo root) and run migrations

```powershell
npx prisma migrate deploy
```

3. Run in development (hot-reload)

```powershell
npm run dev
```

4. Build for production

```powershell
npm run build
npm start
```

Environment
- Copy `.env.example` to `.env` and adjust values if needed. Defaults assume Postgres from `docker/docker-compose.yml` and expose the API on port `5001` (so it doesn’t clash with the Docker container).

Run with Docker
1. Build and start the stack: `docker compose -f docker/docker-compose.yml up --build`
2. Containers expose the API on `http://localhost:5000`. When running the Node server locally (`npm run dev`), it listens on `http://localhost:5001` by default.
3. Swagger UI is available on `/docs` for both approaches.
4. Stop containers: `docker compose -f docker/docker-compose.yml down`

API endpoints
- `POST /auth/register` → create account, receive JWT + public user
- `POST /auth/login` → authenticate existing user, receive JWT + public user
- `GET /users/me` → current profile (requires `Authorization: Bearer <token>`)
- `GET /health` → health probe for monitoring or docker-compose readiness

Notes
- Prisma expects a reachable PostgreSQL instance; the included compose file exposes `devconnect_db` with seeded credentials.
- Passwords are stored as bcrypt hashes; never persist plain text.
- Error handling is centralized via `src/middleware/errorHandler.ts`.
- Swagger UI is mounted once at startup, so docs stay in sync with Git revisions.

Project TODO
- [x] Centralize error handling middleware
- [x] Expose `POST /auth/register` alongside login
- [x] Publish `.env.example` with documented variables
- [x] Document API endpoints (OpenAPI/Postman)
- [ ] Add automated tests and CI pipeline
- [ ] Harden security configuration (CORS, rate limiting, production logging)

Pushing to GitHub (manual)
1. Create a new repository on GitHub (via the website). Do NOT initialize it with a README — you'll push your local repo.
2. From this project folder run:

```powershell
# initialize local git (if not already initialized)
git init
git add .
git commit -m "Initial commit"

# replace <REMOTE_URL> with the HTTPS/SSH URL from GitHub
git branch -M main
git remote add origin <REMOTE_URL>
git push -u origin main
```

Or use the included helper `publish-to-github.ps1` which will ask for the remote URL and push for you.