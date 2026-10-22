"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { useMember } from "@/components/member/useMember";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Our Services" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { profile } = useMember();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 240 && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  // HIDE Header completely on Admin pages (/admin)
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const memberHref = profile ? "/member" : "/login";
  const memberLabel = profile ? "My sessions" : "Member login";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      } ${
        scrolled
          ? "bg-sand/90 backdrop-blur-md shadow-[0_4px_24px_rgba(42,59,48,.08)] py-3"
          : "bg-transparent py-4 sm:py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-serif text-2xl font-medium tracking-tight text-forest sm:text-3xl">
          Escape in Yoga
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-1 rounded-full border border-forest/15 bg-white/70 p-1.5 shadow-sm backdrop-blur md:flex" aria-label="Main">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive(l.href)
                  ? "bg-forest/10 text-forest shadow-xs font-semibold"
                  : "text-forest/75 hover:bg-forest/5 hover:text-forest"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Link href="/login" className="text-sm font-semibold text-forest/80 hover:text-forest">
            Member Area
          </Link>
          <Button href="/booking" size="sm">Book a session</Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest md:hidden"
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-x-0 top-full border-b border-forest/15 bg-sand px-5 py-6 shadow-xl md:hidden">
          <nav className="flex flex-col gap-2" aria-label="Mobile main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-2xl px-4 py-3 text-base font-medium ${
                  isActive(l.href) ? "bg-forest/10 text-forest font-semibold" : "text-forest/80"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex flex-col gap-3 border-t border-forest/15 pt-6">
            <Link href={memberHref} className="px-4 py-2 text-center text-sm font-semibold text-forest/80">
              {memberLabel}
            </Link>
            <Button href="/booking" size="lg" className="w-full">Book a session</Button>
          </div>
        </div>
      )}
    </header>
  );
}
