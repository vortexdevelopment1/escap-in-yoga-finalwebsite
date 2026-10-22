"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("eiy_admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }
    setIsAuthenticated(true);
    loadEnquiries();

    // Mark all as read when opening this inquiries page
    try {
      const eq = localStorage.getItem("eiy:enquiries");
      const list: EnquiryItem[] = eq ? JSON.parse(eq) : [];
      if (list.length > 0) {
        localStorage.setItem("eiy:enquiries_read_count", String(list.length));
        window.dispatchEvent(new Event("storage"));
      }
    } catch {}
  }, [router]);

  function loadEnquiries() {
    let saved: EnquiryItem[] = [];
    try {
      const eq = localStorage.getItem("eiy:enquiries");
      if (eq) saved = JSON.parse(eq);
    } catch {}
    setEnquiries(saved);
  }

  function saveEnquiriesList(updated: EnquiryItem[]) {
    setEnquiries(updated);
    localStorage.setItem("eiy:enquiries", JSON.stringify(updated));
    localStorage.setItem("eiy:enquiries_read_count", String(updated.length));
    setSelectedIds([]);
    window.dispatchEvent(new Event("storage"));
  }

  // Single Delete
  function handleDeleteOne(id: string) {
    if (!confirm("Are you sure you want to delete this message?")) return;
    const updated = enquiries.filter((e) => e._id !== id);
    saveEnquiriesList(updated);
  }

  // Delete Selected
  function handleDeleteSelected() {
    if (selectedIds.length === 0) return;
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} selected message(s)?`)) return;
    const updated = enquiries.filter((e) => !selectedIds.includes(e._id));
    saveEnquiriesList(updated);
  }

  // Delete All
  function handleDeleteAll() {
    if (enquiries.length === 0) return;
    if (!confirm("Are you sure you want to delete ALL inquiries?")) return;
    saveEnquiriesList([]);
  }

  // Toggle selection
  function toggleSelect(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  if (!isAuthenticated) return null;

  const filtered = enquiries.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.email.toLowerCase().includes(search.toLowerCase()) ||
      e.message.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-sand pt-12 pb-24 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-forest/15">
        <div>
          <span className="text-xs font-semibold text-sage uppercase tracking-wider">
            Teacher Portal
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-forest">
            Contact Inquiries
          </h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-white border border-forest/15 text-forest hover:bg-forest/5 transition"
          >
            ← Student Bookings & Slots
          </Link>
          <span className="px-4 py-2 rounded-full text-xs font-semibold bg-forest text-cream shadow-sm flex items-center gap-1.5">
            <svg className="w-4 h-4 text-cream" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>Inquiries ({enquiries.length})</span>
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => {
              localStorage.removeItem("eiy_admin_token");
              router.push("/admin");
            }}
          >
            Sign out
          </Button>
        </div>
      </div>

      {/* Action Toolbar: Search + Delete Controls */}
      <div className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 sm:p-5 rounded-3xl border border-forest/10 shadow-sm">
        <div className="w-full md:max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries by name, email or keyword..."
            className="w-full rounded-2xl border border-forest/20 bg-sand/30 px-4 py-2.5 text-sm text-forest focus:border-forest focus:outline-none"
          />
        </div>

        {/* Delete Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              onClick={handleDeleteSelected}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-600 hover:bg-rose-700 text-white shadow-sm transition"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Selected ({selectedIds.length})
            </button>
          )}

          {enquiries.length > 0 && (
            <button
              onClick={handleDeleteAll}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-100 hover:bg-rose-200 text-rose-800 transition"
            >
              Delete All
            </button>
          )}
        </div>
      </div>

      {/* Messages List */}
      <div className="mt-6 space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-3xl bg-white p-14 text-center border border-forest/10 shadow-sm">
            <svg className="mx-auto h-10 w-10 text-forest/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <p className="mt-3 text-base font-medium text-forest">No inquiries found</p>
            <p className="text-xs text-forest/60 mt-1">Inquiries submitted from the website Contact form will appear here.</p>
          </div>
        ) : (
          filtered.map((m) => {
            const isSelected = selectedIds.includes(m._id);
            return (
              <div
                key={m._id}
                className={`rounded-3xl bg-white p-6 sm:p-7 border transition-all ${
                  isSelected ? "border-forest/50 bg-forest/5 ring-1 ring-forest/30" : "border-forest/10 hover:shadow-md"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Checkbox + Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelect(m._id)}
                      className="mt-1.5 h-4 w-4 rounded border-forest/30 text-forest focus:ring-forest cursor-pointer"
                    />

                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="font-serif text-lg font-medium text-forest">{m.name}</h3>
                        <a
                          href={`mailto:${m.email}`}
                          className="text-xs text-sage underline underline-offset-2 hover:text-forest"
                        >
                          {m.email}
                        </a>
                        <span className="text-xs text-forest/40">
                          • {new Date(m.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>

                      <p className="text-sm text-forest/80 leading-relaxed bg-sand/40 p-4 rounded-2xl border border-forest/5">
                        &ldquo;{m.message}&rdquo;
                      </p>
                    </div>
                  </div>

                  {/* Actions: Reply & Delete One */}
                  <div className="flex items-center gap-2.5 sm:self-center shrink-0">
                    <a
                      href={`mailto:${m.email}?subject=Response from Escape in Yoga&body=Hi ${m.name},%0D%0A%0D%0AThank you for reaching out to Escape in Yoga.`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-forest hover:bg-forest/90 text-cream text-xs font-semibold transition-all shadow-sm"
                    >
                      Reply by Email
                    </a>

                    <button
                      type="button"
                      onClick={() => handleDeleteOne(m._id)}
                      title="Delete this inquiry"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 hover:text-rose-800 transition"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
