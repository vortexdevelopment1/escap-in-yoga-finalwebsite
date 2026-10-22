# Escape in Yoga

Customer-facing website for Escape in Yoga (trainer: Avani Jain).

**Tech stack:** Next.js (App Router) · TypeScript · React · Tailwind CSS

- **Frontend-only implementation.** All data is mock data in `data/`. Bookings and the demo login are stored in the browser's `localStorage`.
- **Backend:** Not included.
- **Admin dashboard:** Not included.
- **Dependencies:** Not installed.

## Install and run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Demo login

- Email: `demo@escapeinyoga.com`
- Password: `yoga1234` (demo journey is always on Day 7 of 30)
- Or log in with the email from a booking made on the same browser, using any password of 6+ characters.

## Routes

`/` · `/about` · `/classes` · `/classes/[slug]` · `/schedule` · `/booking` · `/booking/confirmation` · `/login` · `/member` · `/member/sessions` · `/faq` · `/contact` · `/privacy` · `/terms`

## Structure

For a complete guide with explanations on where everything lives, see [STRUCTURE.md](./STRUCTURE.md).

- `app/` routes (Next.js App Router)
- `components/` UI by domain (`ui/`, `layout/`, `home/`, `classes/`, `postures/`, `schedule/`, `booking/`, `member/`, `notifications/`)
- `data/` mock content (classes, postures, timetable, sessions)
- `hooks/` custom React hooks (`useMember`, `useNow`)
- `lib/` utilities (dates, validation, storage, mock session access)
- `public/images/` web images and illustrations (`raw-photography/` for original camera files)
- `types/` shared TypeScript interfaces

## Connecting a backend later

- `lib/storage.ts`: replace with API calls for bookings and sessions.
- `lib/sessionAccess.ts`: replace with a call that returns a restricted meeting link for the registered email.
- Login in `components/member/LoginForm.tsx` and forms in `BookingFlow.tsx` / `ContactForm.tsx` simulate latency and are ready to swap for real requests.
- WhatsApp notifications are shown as UI previews only.
