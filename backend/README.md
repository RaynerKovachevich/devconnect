# DevConnect Backend

Simple Node + TypeScript backend for DevConnect.

What this repo contains
- Express + TypeScript app (src/)
- Simple in-memory user store (services) — useful for prototyping
- Routes in `src/controllers`, business logic in `src/services`, models in `src/models`

Quick start (Windows PowerShell)
1. Install dependencies

```powershell
npm install
```

2. Run in development (hot-reload)

```powershell
npm run dev
```

3. Build for production

```powershell
npm run build
npm start
```

Environment
- Create a `.env` file in the project root for configuration (e.g. `PORT=5000`).

Notes
- The user store is currently in-memory and ephemeral. When ready for production, replace it with a persistent database (Postgres) and make services async.
- Passwords are stored as bcrypt hashes (do not store plain-text passwords).

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

Next steps (recommended)
- Add input validation (zod/joi) and centralized error handling.
- Replace the in-memory store with a DB-backed repository and convert services to async. Consider the refactor to a repository pattern (I can implement that for you).
- Add tests and CI pipeline.

If you want, I can now implement the repository abstraction (in-memory async repo) so swapping to Postgres later is frictionless.