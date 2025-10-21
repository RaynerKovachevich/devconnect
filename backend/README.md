# DevConnect Backend

Type-safe Express backend for DevConnect with JWT auth and Prisma.

What this repo contains
- Express + TypeScript app in `src/`
- Prisma ORM connected to PostgreSQL (see `docker/` for dev compose setup)
- Authentication flow with bcrypt password hashing and JWT tokens
- Modular controllers/services/models structure

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
- Copy `.env` (or create `.env.local`) with `DATABASE_URL`, `JWT_SECRET`, and `PORT` values before starting the app.

Notes
- Prisma expects a reachable PostgreSQL instance; the included compose file exposes `devconnect_db` with seeded credentials.
- Passwords are stored as bcrypt hashes; never persist plain text.
- Error handling is centralized via `src/middleware/errorHandler.ts`.

Project TODO
- [x] Centralize error handling middleware
- [x] Expose `POST /auth/register` alongside login
- [ ] Publish `.env.example` with documented variables
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