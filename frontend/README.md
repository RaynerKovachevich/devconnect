# DevConnect Frontend

Single-page frontend for DevConnect: a developer networking platform with authentication, dashboard insights, and customizable profiles. Built with React, TypeScript, and Vite.

## ✨ Features

- Modern landing page with marketing navbar, hero mesh artwork, and call-to-action sections.
- Auth flow (login/register) with protected routes, local token storage, and logout handling.
- Dashboard showing quick actions, weekly snapshot stats, progress bars, and an activity timeline.
- Profile editor backed by localStorage with live preview card, save/reset actions, and last-saved indicator.
- Reusable UI primitives (buttons, inputs, textareas) and layout shell with responsive styling.

##  Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173 and sign up with any credentials. The backend API URL targets `http://localhost:5000` by default; adjust `src/services/auth.ts` if your server runs elsewhere.

## 🧪 Manual Testing Checklist

- `Auth` → Register with a new email, confirm success message, then log out.
- `Auth` → Attempt login with wrong credentials and verify error alert.
- `Navigation` → Authenticated users can access `/dashboard` and `/profile`; unauthenticated users are redirected to `/login`.
- `Profile` → Update each field, click Save, refresh the page, and confirm data persists via localStorage.
- `Profile` → Use Reset form and ensure preview + stored data clear out.
- `Dashboard` → Use quick-action buttons to navigate to Profile/Home and back.

Record test notes or screenshots in the repository’s issue tracker if anything regresses.

## 🔮 Next Enhancements

1. **Backend sync** – connect profile data to the NestJS backend once endpoints are available; persist last-saved timestamp from the server response.
2. **Global auth context** – replace direct `localStorage` checks with React context to centralize session state and make future token refresh easier.
3. **Toast/toast queue** – surface success/error events with a reusable toast provider instead of inline messages.
4. **Accessibility pass** – audit keyboard focus, ARIA labels, and color contrast using tools like Axe or Lighthouse.

## 🧰 Tech Stack

- React 18 + TypeScript
- Vite 5 / Vitest-ready tooling
- CSS Modules (global stylesheet) with modern layout primitives
- localStorage for profile drafts; Fetch API in `src/services/auth.ts`

## 📄 License

This frontend inherits the repo’s root licensing. Add a dedicated section here if you need project-specific terms.
