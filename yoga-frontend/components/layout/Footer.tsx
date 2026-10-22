"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { InstagramIcon, YoutubeIcon, WhatsAppIcon, MailIcon, PhoneIcon } from "@/components/ui/Icons";

const groups = [
  {
    title: "Explore",
    links: [
      ["About", "/about"],
      ["Our Services", "/classes"],
      ["Schedule", "/schedule"],
      ["FAQs", "/faq"],
      ["Contact", "/contact"],
    ],
  },
  {
    title: "Member",
    links: [
      ["Find My Session", "/login"],
      ["My sessions", "/member/sessions"],
      ["Book a session", "/booking"],
    ],
  },
];

export default function Footer() {
  const pathname = usePathname();

  // HIDE Footer completely on Admin pages (/admin)
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* Brand & Socials */}
        <div>
          <p className="font-serif text-3xl text-white">Escape in Yoga</p>
          <p className="mt-4 max-w-sm text-white/80 leading-relaxed text-sm">
            Live yoga with Avani Jain. Choose a batch, book your place and return to your practice every day.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              <InstagramIcon />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition hover:bg-white/10 hover:text-white"
            >
              <YoutubeIcon />
              <span className="sr-only">YouTube</span>
            </a>
            <a
              href="https://wa.me/919826012345?text=Namaste%20Avani%20ji,%20I%20have%20an%20inquiry%20about%20Escape%20in%20Yoga."
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-emerald-300 transition hover:bg-emerald-500 hover:text-white hover:border-emerald-500"
            >
              <WhatsAppIcon />
              <span className="sr-only">WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Navigation columns */}
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="font-serif text-xl text-white">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map(([label, href]) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-white/80 transition hover:text-warmbeige">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        {/* Direct Contact Column */}
        <div>
          <p className="font-serif text-xl text-white">Get in touch</p>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li>
              <a
                href="https://wa.me/919826012345?text=Namaste%20Avani%20ji,%20I%20have%20an%20inquiry%20about%20Escape%20in%20Yoga."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white/80 hover:text-emerald-300 transition"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-emerald-300">
                  <WhatsAppIcon />
                </span>
                <span>Chat on WhatsApp</span>
              </a>
            </li>
            <li>
              <a
                href="mailto:avani@escapeinyoga.com"
                className="flex items-center gap-3 text-white/80 hover:text-warmbeige transition"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                  <MailIcon />
                </span>
                <span className="break-all">avani@escapeinyoga.com</span>
              </a>
            </li>
            <li>
              <a
                href="tel:+919826012345"
                className="flex items-center gap-3 text-white/80 hover:text-warmbeige transition"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white">
                  <PhoneIcon />
                </span>
                <span>+91 98260 12345</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Escape in Yoga. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-warmbeige">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-warmbeige">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
