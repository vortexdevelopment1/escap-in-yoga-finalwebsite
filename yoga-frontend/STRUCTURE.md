# 🧘 Project Architecture & Folder Guide (Kahan Kaunsi Cheez Hai)

Yeh guide aapko poore codebase ka simple aur saaf structure samjhane ke liye banayi gayi hai, taaki aapko koi bhi file dhundhne me aasani ho.

---

## 📁 High-Level Folder Structure

```text
Escape_in_yoga-Arpita/
├── 🌐 app/                 --> Sabhi website pages & routes (Next.js App Router)
├── 🧩 components/          --> UI components (Home, Booking, Member, Buttons, etc.)
│   ├── booking/            --> Booking flow & summary components
│   ├── classes/            --> Class cards & class details
│   ├── home/               --> Homepage sections (Hero, About, Benefits, etc.)
│   ├── layout/             --> Header (Navbar), Footer, PageHero
│   ├── member/             --> Member portal, dashboard, timers, cards
│   ├── notifications/      --> WhatsApp / SMS notification previews
│   ├── postures/           --> Yoga asana postures & modal popup
│   ├── schedule/           --> Timetable & schedule cards
│   └── ui/                 --> Reusable UI: Button, Input, Modal, Icons, etc.
├── 🗄️ data/                --> Mock data / Content (Classes, Postures, Schedule, etc.)
├── 🪝 hooks/               --> Custom React Hooks (useMember, useNow)
├── 🛠️ lib/                 --> Helper functions (Dates, Storage, Validation)
├── 🖼️ public/              --> Images, SVGs, photoshoot raw files
│   ├── images/             --> Class & posture images, hero SVG
│   └── images/raw-photography/ --> Original photoshoot photos
├── 🎨 styles/              --> Global Tailwind CSS
├── 🏷️ types/               --> TypeScript type definitions
├── ⚙️ next.config.mjs       --> Next.js settings
├── ⚙️ tailwind.config.ts    --> Colors, fonts, theme settings
└── ⚙️ tsconfig.json        --> TypeScript path aliases (@/*)
```

---

## 🗺️ Quick Cheat-Sheet: "Mujhe yeh badalna hai, kahan jau?"

| Kaam (What you want to do) | Kahan milega (File Path) |
| :--- | :--- |
| **Homepage badalna hai** (Hero, Quotes, Sections) | `app/page.tsx` & `components/home/` |
| **Navbar / Menu ya Footer badalna hai** | `components/layout/Header.tsx` & `Footer.tsx` |
| **Trainer ka photo ya bio badalna hai** | `components/home/TrainerSection.tsx` & `app/about/page.tsx` |
| **Yoga Classes ki list ya details badalna hai** | `data/classes.ts` |
| **Postures / Asanas ki list ya benefits badalna hai** | `data/postures.ts` |
| **Class ke timings / Schedule badalna hai** | `data/schedule.ts` |
| **Buttons, Inputs, Icons ka design badalna hai** | `components/ui/` |
| **Website ke theme colors ya fonts badalna hai** | `tailwind.config.ts` & `styles/globals.css` |
| **Booking form ya member login logic** | `components/booking/` & `components/member/` |
| **Validation ya date formatting functions** | `lib/validation.ts` & `lib/dates.ts` |

---

## 🔎 Detail Breakdown

### 1. `app/` (Pages & Routes)
Next.js App Router har folder ko ek website route banata hai:
- `app/page.tsx` ➔ **Home page (`/`)**
- `app/about/page.tsx` ➔ **About page (`/about`)**
- `app/classes/page.tsx` ➔ **All classes (`/classes`)**
- `app/classes/[slug]/page.tsx` ➔ **Single class details (`/classes/hatha-yoga` etc.)**
- `app/schedule/page.tsx` ➔ **Weekly schedule (`/schedule`)**
- `app/booking/page.tsx` ➔ **Booking page (`/booking`)**
- `app/booking/confirmation/page.tsx` ➔ **Booking complete page**
- `app/login/page.tsx` ➔ **Member login page (`/login`)**
- `app/member/page.tsx` ➔ **Member dashboard (`/member`)**
- `app/member/sessions/page.tsx` ➔ **Daily sessions link (`/member/sessions`)**
- `app/faq/page.tsx` ➔ **Searchable FAQs knowledge base (`/faq`)**
- `app/contact/page.tsx` ➔ **Contact page (`/contact`)**
- `app/privacy/page.tsx` & `app/terms/page.tsx` ➔ **Legal pages**
- `app/layout.tsx` ➔ **Main layout** (Includes `Header`, `Footer`, Fonts)

---

### 2. `components/` (Components Folder)
Sabhi UI pieces organized folders me hain. Har folder me ek clean `index.ts` hai jisse import karna super easy hai:

- **`components/ui/`**: Basic building blocks
  - `Button.tsx`: Primary/Secondary styled button
  - `Field.tsx`: Input, Textarea, error hints
  - `Icons.tsx`: SVG icons (Lotus, Wave, Arrow, Clock, Phone, etc.)
  - `Modal.tsx`: Popup window
  - `Photo.tsx`: Image container with smooth zoom/loading
  - `SectionHeading.tsx`: Section titles with eyebrow tag

- **`components/layout/`**: Page structure
  - `Header.tsx`: Navigation bar with mobile slide menu
  - `Footer.tsx`: Links, copyright, social icons
  - `PageHero.tsx`: Top banner for inner pages

- **`components/home/`**: Homepage ke sections
  - `Hero.tsx`: Main hero image, tagline, and intro
  - `SuccessMetrics.tsx`: Stat counters (5,000+ students, 98% consistency, 10+ years, 4.9 rating)
  - `AboutSection.tsx`: Studio philosophy and trainer background
  - `TrainerSection.tsx`: Avani Jain's introduction and credentials
  - `USPSection.tsx`: Unique Selling Propositions (live alignment, 30-day journey, holistic practice, flexible batches)
  - `BenefitsSection.tsx`: Physical and mental benefits cards
  - `HowItWorks.tsx`: 3-step onboarding guide
  - `JourneySection.tsx`: 30-day progressive roadmap
  - `TestimonialsSection.tsx`: Verified student reviews, 5-star ratings, filter pills
  - `FAQSection.tsx`: Interactive FAQ accordion with category filters
  - `CTABanner.tsx`: Booking call-to-action banner
  - `ContactSection.tsx` & `ContactForm.tsx`: Inquiries and messaging

- **`components/classes/`**: Class cards & lists
- **`components/postures/`**: Asana cards & detail popup modal
- **`components/schedule/`**: Day-wise timetable
- **`components/booking/`**: Multi-step booking flow
- **`components/member/`**: Dashboard, 30-day journey grid, countdown timer

> **Import Tip**: Aap direct import kar sakte hain:
> ```ts
> import { Button, Modal } from "@/components/ui";
> import { Header, Footer } from "@/components/layout";
> import { Hero } from "@/components/home";
> ```

---

### 3. `data/` (Static & Mock Data)
Real database lagne se pehle sabhi data yahan central files me rakha hai:
- `data/classes.ts`: Hatha, Vinyasa, Yin, Hot yoga, Meditation, Breathwork
- `data/postures.ts`: Downward Dog, Cobra, Tree, Warrior postures
- `data/schedule.ts`: Mon-Sun batch timings & instructors
- `data/sessions.ts`: 30-day member journey titles & descriptions
- `data/subscription.ts`: Monthly membership price & features

---

### 4. `hooks/` (React Custom Hooks)
- `hooks/useMember.ts`: Logged-in member ka status aur booking data manage karta hai.
- `hooks/useNow.ts`: Real-time clock jo har second tick hota hai (countdown timers ke liye).

---

### 5. `lib/` (Utilities & Helper Functions)
- `lib/dates.ts`: Date calculations, time formatters, weekday helpers.
- `lib/validation.ts`: Form fields check karna (email regex, phone number, passwords).
- `lib/storage.ts`: Browser ke `localStorage` me booking aur login save/load karna.
- `lib/sessionAccess.ts`: Member ke daily live session link unlock karne ka check.

---

### 6. `public/` (Images & Static Assets)
- `public/images/`: SVGs and JPG images used across the site.
- `public/images/raw-photography/`: High-resolution camera originals (Sony RAW `.ARW` & `.JPG`).
