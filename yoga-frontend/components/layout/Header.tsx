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
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
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

          {/* Desktop navigation (hidden on tablets < 1024px, visible on large screens) */}
          <nav className="hidden items-center gap-1 rounded-full border border-forest/15 bg-white/70 p-1.5 shadow-xs backdrop-blur lg:flex" aria-label="Main">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive(l.href)
                    ? "bg-forest/10 text-forest shadow-2xs font-semibold"
                    : "text-forest/75 hover:bg-forest/5 hover:text-forest"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions (hidden on tablets < 1024px, visible on large screens) */}
          <div className="hidden items-center gap-3 lg:flex">
            <Link href="/login" className="text-sm font-semibold text-forest/80 hover:text-forest">
              Member Area
            </Link>
            <Button href="/booking" size="sm">Book a session</Button>
          </div>

          {/* Mobile & Tablet menu toggle (visible on all screens < 1024px) */}
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-forest/20 text-forest lg:hidden hover:bg-forest/5 transition-colors"
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </header>

      {/* Mobile & Tablet Side Drawer Outside Header (< 1024px) */}
      {/* 1. Dark Backdrop Overlay: Click anywhere to close */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      {/* 2. Side Drawer Panel: Pure Solid Opaque White/Cream with High Elevation */}
      <aside
        className={`fixed right-0 top-0 bottom-0 z-[70] flex w-[300px] sm:w-[340px] max-w-[85vw] flex-col justify-between bg-white shadow-2xl transition-transform duration-300 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Mobile and tablet navigation"
      >
        <div className="p-6">
          {/* Drawer Top Header: Clean close button, no redundant text */}
          <div className="flex items-center justify-between pb-5 border-b border-forest/10">
            <span className="font-serif text-lg font-semibold text-forest">
              Explore
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-sand/60 text-forest hover:bg-forest/10 transition-colors"
            >
              <CloseIcon />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col gap-2" aria-label="Mobile links">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`rounded-2xl px-4 py-3 text-base font-medium transition ${
                  isActive(l.href)
                    ? "bg-forest/10 text-forest font-semibold"
                    : "text-forest/80 hover:bg-forest/5 hover:text-forest"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Drawer Bottom Actions */}
        <div className="p-6 border-t border-forest/10 bg-sand/30 flex flex-col gap-3">
          <Link
            href={memberHref}
            onClick={() => setOpen(false)}
            className="rounded-full py-2.5 text-center text-sm font-semibold text-forest/85 hover:text-forest hover:bg-forest/5 transition"
          >
            {memberLabel}
          </Link>
          <Button href="/booking" size="lg" className="w-full text-center justify-center" onClick={() => setOpen(false)}>
            Book a session
          </Button>
        </div>
      </aside>
    </>
  );
}
