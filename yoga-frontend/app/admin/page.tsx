"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";

interface BookingItem {
  _id: string;
  name: string;
  email: string;
  phone: string;
  className: string;
  batchTime: string;
  dateISO: string;
  planType: "FREE_TRIAL" | "30_DAY_COHORT";
  status: string;
  currentDay?: number;
  attendedDays?: number;
  isRestricted?: boolean;
  createdAt: string;
}

interface EnquiryItem {
  _id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

interface OccupancyItem {
  time: string;
  enrolled: number;
  max: number;
}

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);

  const [metrics, setMetrics] = useState({ totalBookings: 0, freeTrials: 0, activeSubscribers: 0 });
  const [occupancy, setOccupancy] = useState<OccupancyItem[]>([]);
  const [bookings, setBookings] = useState<BookingItem[]>([]);
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filterPlan, setFilterPlan] = useState<"ALL" | "FREE_TRIAL" | "30_DAY_COHORT">("ALL");

  const SESSION_DURATION_MS = 15 * 60 * 1000; // 15 Minutes ideal security auto-expiry

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("eiy_admin_token");
    const loginTime = localStorage.getItem("eiy_admin_login_time");

    // Check if session has expired (2 Hours limit)
    if (token && loginTime) {
      const elapsed = Date.now() - parseInt(loginTime, 10);
      if (elapsed > SESSION_DURATION_MS) {
        // Session expired: logout cleanly
        localStorage.removeItem("eiy_admin_token");
        localStorage.removeItem("eiy_admin_login_time");
        setIsAuthenticated(false);
        setLoginError("Your admin session has expired. Please log in again for security.");
        return;
      }
      setIsAuthenticated(true);
      fetchDashboardData();
    } else if (token) {
      setIsAuthenticated(true);
      fetchDashboardData();
    }
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    const cleanEmail = email.toLowerCase().trim();
    const cleanPassword = password.trim();

    try {
      // 1. Try Backend API login with signed JWT
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.token) {
          localStorage.setItem("eiy_admin_token", data.token);
          localStorage.setItem("eiy_admin_login_time", Date.now().toString());
          setIsAuthenticated(true);
          setLoading(false);
          fetchDashboardData();
          return;
        }
      }
    } catch {
      // Backend offline fallback check
    }

    // Configurable credentials match (vortex@gmail.com)
    const allowedAdminEmail = "vortex@gmail.com";
    const currentAdminPass = "YogaAdmin@2026";

    if (cleanEmail === allowedAdminEmail && cleanPassword === currentAdminPass) {
      localStorage.setItem("eiy_admin_token", "admin-auth-token-escapeinyoga-2026");
      localStorage.setItem("eiy_admin_login_time", Date.now().toString());
      setIsAuthenticated(true);
      setLoading(false);
      loadMockData();
      return;
    }

    setLoading(false);
    setLoginError("Invalid Admin Email or Password.");
  }

  function handleLogout() {
    localStorage.removeItem("eiy_admin_token");
    localStorage.removeItem("eiy_admin_login_time");
    setIsAuthenticated(false);
  }

  async function fetchDashboardData() {
    try {
      const res = await fetch("http://localhost:5000/api/admin/dashboard");
      if (!res.ok) throw new Error("Dashboard fetch failed");
      const data = await res.json();
      if (data.success) {
        setMetrics(data.metrics);
        setOccupancy(data.occupancy);
        setBookings(data.bookings);
        return;
      }
    } catch {
      loadMockData();
    }
  }

  function loadMockData() {
    // Only real bookings made by user
    let realBookings: BookingItem[] = [];
    try {
      const savedList = localStorage.getItem("eiy:all_bookings");
      if (savedList) {
        realBookings = JSON.parse(savedList).map((b: any, idx: number) => ({
          ...b,
          _id: b._id || `book-${b.email || idx}-${idx}-${Date.now()}`,
        }));
      } else {
        const single = localStorage.getItem("eiy:booking");
        if (single) {
          const b = JSON.parse(single);
          realBookings.push({
            _id: "book-" + Date.now(),
            name: b.name,
            email: b.email,
            phone: b.phone,
            className: b.className,
            batchTime: b.time || "07:00",
            dateISO: b.dateISO || new Date().toISOString().split("T")[0],
            planType: b.planType || "FREE_TRIAL",
            status: "CONFIRMED",
            createdAt: b.createdAt || new Date().toISOString(),
          });
        }
      }
    } catch {}

    const all = realBookings;
    const trials = all.filter((x) => x.planType === "FREE_TRIAL").length;
    const members = all.filter((x) => x.planType === "30_DAY_COHORT").length;

    // Load contact enquiries directly from localStorage
    let savedEnquiries: EnquiryItem[] = [];
    try {
      const eq = localStorage.getItem("eiy:enquiries");
      if (eq) savedEnquiries = JSON.parse(eq);
    } catch {}

    setEnquiries(savedEnquiries);

    // Calculate unread count (messages not yet viewed)
    const readCount = parseInt(localStorage.getItem("eiy:enquiries_read_count") || "0", 10);
    const unread = Math.max(0, savedEnquiries.length - readCount);
    setUnreadCount(unread);

    setMetrics({ totalBookings: all.length, freeTrials: trials, activeSubscribers: members });
    setOccupancy([
      { time: "06:00 AM", enrolled: all.filter((x) => x.batchTime === "06:00" && x.planType === "FREE_TRIAL").length, max: 15 },
      { time: "07:00 AM", enrolled: all.filter((x) => x.batchTime === "07:00" && x.planType === "FREE_TRIAL").length, max: 15 },
      { time: "08:00 AM", enrolled: all.filter((x) => x.batchTime === "08:00" && x.planType === "FREE_TRIAL").length, max: 15 },
    ]);
    setBookings(all);
  }

  function handleToggleRestrict(bookingId: string) {
    if (!bookingId) return;
    const updated = bookings.map((b) => {
      if (b._id === bookingId) {
        return { ...b, isRestricted: !b.isRestricted };
      }
      return b;
    });
    setBookings(updated);
    localStorage.setItem("eiy:all_bookings", JSON.stringify(updated));
  }

  function handleRemoveStudent(bookingId: string) {
    if (!confirm("Are you sure you want to completely remove this student from the batch?")) return;
    const updated = bookings.filter((b) => b._id !== bookingId);
    setBookings(updated);
    localStorage.setItem("eiy:all_bookings", JSON.stringify(updated));
    localStorage.removeItem("eiy:booking");
    // Recalculate metrics
    const trials = updated.filter((x) => x.planType === "FREE_TRIAL").length;
    const members = updated.filter((x) => x.planType === "30_DAY_COHORT").length;
    setMetrics({ totalBookings: updated.length, freeTrials: trials, activeSubscribers: members });
    setOccupancy([
      { time: "06:00 AM", enrolled: updated.filter((x) => x.batchTime === "06:00" && x.planType === "FREE_TRIAL").length, max: 15 },
      { time: "07:00 AM", enrolled: updated.filter((x) => x.batchTime === "07:00" && x.planType === "FREE_TRIAL").length, max: 15 },
      { time: "08:00 AM", enrolled: updated.filter((x) => x.batchTime === "08:00" && x.planType === "FREE_TRIAL").length, max: 15 },
    ]);
  }

  const filteredBookings = bookings.filter((b) => {
    if (filterPlan === "ALL") return true;
    return b.planType === filterPlan;
  });

  // Prevent SSR Hydration mismatch
  if (!mounted) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center">
        <p className="text-sm font-medium text-forest/60">Loading Admin Portal…</p>
      </div>
    );
  }

  // --- 1. LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-sand flex items-center justify-center px-4 pt-16 pb-12">
        <div className="w-full max-w-md rounded-3xl bg-white p-8 sm:p-10 border border-forest/15 shadow-xl">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold text-forest uppercase tracking-wider">
              Escape in Yoga Admin
            </span>
            <h1 className="mt-3 font-serif text-3xl font-medium text-forest">Teacher Portal</h1>
            <p className="mt-2 text-sm text-forest/70">
              Sign in with your verified credentials to access student telemetry and slot occupancy.
            </p>
          </div>

          {/* CREDENTIALS FORM */}
          <form onSubmit={handleLogin} className="mt-8 space-y-4" autoComplete="off">
            <div>
              <label className="block text-xs font-semibold text-forest/80 uppercase tracking-wider mb-1">
                Admin Email
              </label>
              <input
                type="email"
                required
                autoComplete="new-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter admin email"
                className="w-full rounded-2xl border border-forest/20 px-4 py-3 text-sm text-forest focus:border-forest focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-forest/80 uppercase tracking-wider mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full rounded-2xl border border-forest/20 px-4 py-3 pr-12 text-sm text-forest focus:border-forest focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest/50 hover:text-forest transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="rounded-xl bg-red-100 p-3 text-xs font-medium text-red-900">
                {loginError}
              </p>
            )}

            <Button type="submit" size="lg" className="w-full mt-2" disabled={loading}>
              {loading ? "Authenticating..." : "Access Admin Portal"}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-forest/50">
            Secure Teacher Access Portal
          </p>
        </div>
      </div>
    );
  }

  // --- 2. AUTHENTICATED DASHBOARD ---
  return (
    <div className="min-h-screen bg-sand pt-12 pb-20 px-4 sm:px-8 max-w-7xl mx-auto">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-8 border-b border-forest/15">
        <div>
          <span className="text-xs font-semibold text-sage uppercase tracking-wider">
            Management Ecosystem
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-medium text-forest">
            Admin Telemetry & Slot Oversight
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="px-4 py-2 rounded-full text-xs font-semibold bg-forest text-cream shadow-sm"
          >
            Student Bookings & Slots
          </Link>
          <Link
            href="/admin/enquiries"
            className="relative px-4 py-2 rounded-full text-xs font-semibold bg-white border border-forest/15 text-forest hover:bg-forest/5 transition flex items-center gap-1.5"
          >
            {/* Notification Bell Icon */}
            <svg className="w-4 h-4 text-forest" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span>Inquiries</span>
            {unreadCount > 0 && (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-red-600 px-1 text-[10px] font-bold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </Link>
          <span className="text-sm font-medium text-forest/80 hidden sm:inline ml-2">
            Avani Jain (Trainner)
          </span>
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      </div>

      {/* Top Metrics Cards */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-3xl bg-white p-6 border border-forest/10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest/60">
            Total Bookings
          </p>
          <p className="mt-2 font-serif text-4xl font-medium text-forest">
            {metrics.totalBookings}
          </p>
          <p className="mt-1 text-xs text-forest/70">Cumulative registrations</p>
        </div>

        <div className="rounded-3xl bg-white p-6 border border-forest/10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-sage font-bold">
            Free Trial Leads
          </p>
          <p className="mt-2 font-serif text-4xl font-medium text-forest">
            {metrics.freeTrials}
          </p>
          <p className="mt-1 text-xs text-forest/70">High conversion prospects</p>
        </div>

        <div className="rounded-3xl bg-white p-6 border border-forest/10 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wider text-forest/60">
            Active 30-Day Cohorts
          </p>
          <p className="mt-2 font-serif text-4xl font-medium text-forest">
            {metrics.activeSubscribers}
          </p>
          <p className="mt-1 text-xs text-forest/70">Subscribers in daily unlocking</p>
        </div>
      </div>

      {/* Slot Occupancy Monitor (BRD Max 15 students per batch constraint) */}
      <div className="mt-8 rounded-3xl bg-white p-6 sm:p-8 border border-forest/10 shadow-sm">
        <h2 className="font-serif text-xl font-medium text-forest">
          Morning Batch Occupancy (Monday – Friday)
        </h2>
        <p className="text-xs text-forest/70 mt-1">
          Max 15 students per cohort to ensure close instructor alignment observation.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          {occupancy.map((item) => {
            const percentage = Math.round((item.enrolled / item.max) * 100);
            const isAlmostFull = item.enrolled >= 12;

            return (
              <div key={item.time} className="rounded-2xl bg-sand/60 p-5 border border-forest/10">
                <div className="flex justify-between items-center">
                  <span className="font-serif font-medium text-lg text-forest">{item.time}</span>
                  <span
                    className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isAlmostFull
                        ? "bg-amber-100 text-amber-900"
                        : "bg-forest/10 text-forest"
                    }`}
                  >
                    {item.enrolled} / {item.max} Students
                  </span>
                </div>

                <div className="mt-4 w-full bg-forest/15 h-2.5 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      isAlmostFull ? "bg-amber-600" : "bg-forest"
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="mt-2 text-right text-xs text-forest/60 font-medium">
                  {percentage}% full
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bookings & Free Trial Leads Table */}
      <div className="mt-8 rounded-3xl bg-white p-6 sm:p-8 border border-forest/10 shadow-sm overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-forest/10">
          <div>
            <h2 className="font-serif text-xl font-medium text-forest">
              Student Records & WhatsApp Follow-ups
            </h2>
            <p className="text-xs text-forest/70 mt-1">
              Click &quot;WhatsApp&quot; to send instant personalized greeting or trial follow-up.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex gap-2">
            {(["ALL", "FREE_TRIAL", "30_DAY_COHORT"] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setFilterPlan(filter)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  filterPlan === filter
                    ? "bg-forest text-cream shadow-sm"
                    : "bg-sand text-forest/70 hover:bg-forest/10"
                }`}
              >
                {filter === "ALL"
                  ? "All Records"
                  : filter === "FREE_TRIAL"
                  ? "Free Trials"
                  : "30-Day Cohorts"}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Table */}
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-forest/10 text-xs uppercase tracking-wider text-forest/60">
                <th className="py-3 px-2">Student</th>
                <th className="py-3 px-2">Class & Slot</th>
                <th className="py-3 px-2">Start Date</th>
                <th className="py-3 px-2">Plan</th>
                <th className="py-3 px-2">30-Day Cohort Progress</th>
                <th className="py-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-forest/5">
              {filteredBookings.map((b, index) => {
                const whatsappMsg = encodeURIComponent(
                  `Namaste ${b.name}! 🙏 This is Avani Jain from Escape in Yoga. Looking forward to seeing you on the mat for your ${b.className} session at ${b.batchTime} AM!`
                );
                const whatsappUrl = `https://wa.me/${b.phone.replace(/[^0-9]/g, "")}?text=${whatsappMsg}`;
                const uniqueKey = b._id || `booking-${b.email || "user"}-${index}`;

                return (
                  <tr key={uniqueKey} className="hover:bg-sand/30 transition-colors">
                    <td className="py-4 px-2">
                      <p className="font-medium text-forest">{b.name}</p>
                      <p className="text-xs text-forest/60">{b.email}</p>
                      <p className="text-xs text-forest/60">{b.phone}</p>
                    </td>
                    <td className="py-4 px-2">
                      <span className="font-serif font-medium text-forest">{b.className}</span>
                      <span className="block text-xs text-forest/70">{b.batchTime} AM Batch</span>
                    </td>
                    <td className="py-4 px-2 text-forest/80 font-medium">
                      {b.dateISO}
                    </td>
                    <td className="py-4 px-2">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold ${
                          b.planType === "FREE_TRIAL"
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : "bg-forest/10 text-forest border border-forest/20"
                        }`}
                      >
                        {b.planType === "FREE_TRIAL" ? "Free Trial" : "30-Day Member"}
                      </span>
                    </td>
                    {/* 30-Day Progress Bar & Day Tracker */}
                    <td className="py-4 px-2 min-w-[170px]">
                      {b.planType === "30_DAY_COHORT" ? (
                        (() => {
                          const today = new Date().setHours(0, 0, 0, 0);
                          const start = new Date(b.dateISO).setHours(0, 0, 0, 0);
                          const diffDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
                          const curDay = diffDays < 0 ? 0 : Math.min(diffDays + 1, 30);
                          const pct = Math.round((curDay / 30) * 100);

                          return (
                            <div>
                              <div className="flex items-center justify-between text-xs mb-1">
                                <span className="font-semibold text-forest">
                                  {curDay === 0 ? "Starting Soon" : `Day ${curDay} of 30`}
                                </span>
                                <span className="text-forest/60">{pct}%</span>
                              </div>
                              <div className="h-2 w-full rounded-full bg-forest/10 overflow-hidden">
                                <div
                                  className="h-full rounded-full bg-forest transition-all"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                              <p className="text-[10px] text-forest/60 mt-0.5">
                                {curDay === 0
                                  ? `Starts on ${b.dateISO}`
                                  : `Active session tracker (${pct}%)`}
                              </p>
                            </div>
                          );
                        })()
                      ) : (
                        <span className="text-xs text-forest/40 italic">Single Free Class</span>
                      )}
                    </td>
                    <td className="py-4 px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-all shadow-sm"
                        >
                          WhatsApp
                        </a>

                        {/* Restrict / Unrestrict Member Access */}
                        <button
                          type="button"
                          onClick={() => handleToggleRestrict(b._id)}
                          title={b.isRestricted ? "Unrestrict student access" : "Restrict student access"}
                          className={`px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                            b.isRestricted
                              ? "bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200"
                              : "bg-white text-forest/70 border-forest/20 hover:bg-forest/5"
                          }`}
                        >
                          {b.isRestricted ? "Restricted" : "Restrict"}
                        </button>

                        {/* Remove Student from Batch */}
                        <button
                          type="button"
                          onClick={() => handleRemoveStudent(b._id)}
                          title="Remove student from batch"
                          className="p-1.5 rounded-full text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
