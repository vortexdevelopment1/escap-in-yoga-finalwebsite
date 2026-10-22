"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { getBooking, saveSession } from "@/lib/storage";
import { validateEmail } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") === "/member/sessions" ? "/member/sessions" : "/member";

  const [mode, setMode] = useState<"login" | "forgot">("login");
  const [email, setEmail] = useState(params.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  // OTP / Reset State
  const [resetIdentifier, setResetIdentifier] = useState(""); // WhatsApp phone or Email
  const [otpSent, setOtpSent] = useState(false);
  const [enteredOtp, setEnteredOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);

  useEffect(() => setEmail((e) => e || params.get("email") || ""), [params]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError("");
    const err = validateEmail(email);
    setError(err);
    if (err) return;

    if (!password || password.length < 4) {
      setFormError("Please enter your account password (minimum 4 characters).");
      return;
    }

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 600));

    const typedEmail = email.trim().toLowerCase();
    const currentBooking = getBooking();

    // Check if member has been restricted by Admin
    let allBookings: any[] = [];
    try {
      allBookings = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
    } catch {}

    const matchedBooking = allBookings.find((b: any) => b.email && b.email.toLowerCase().trim() === typedEmail);

    if (matchedBooking && matchedBooking.isRestricted) {
      setStatus("idle");
      setFormError("Your account access has been restricted by the instructor. Please contact support via WhatsApp.");
      return;
    }

    // Check if user is a 30-Day Cohort member (from all_bookings list or current booking or demo accounts)
    const isCohortMember =
      (matchedBooking && matchedBooking.planType === "30_DAY_COHORT") ||
      (currentBooking &&
        currentBooking.email.toLowerCase().trim() === typedEmail &&
        (currentBooking.planType === "30_DAY_COHORT" || !currentBooking.planType)) ||
      typedEmail === "demo@escapeinyoga.com" ||
      typedEmail === "avani@escapeinyoga.com" ||
      typedEmail === "neha@gmail.com";

    const isFreeTrialOnly =
      matchedBooking?.planType === "FREE_TRIAL" ||
      (currentBooking &&
        currentBooking.email.toLowerCase().trim() === typedEmail &&
        currentBooking.planType === "FREE_TRIAL");

    if (isFreeTrialOnly && !isCohortMember) {
      setStatus("idle");
      setFormError(
        "You booked a 1-day Free Trial. Free trial sessions do not require a member password. Your Zoom link was provided at booking."
      );
      return;
    }

    if (!isCohortMember) {
      setStatus("idle");
      setFormError("No active 30-Day Cohort membership found for this email. Please enroll in a cohort first.");
      return;
    }

    // Verify password matches if set during booking or demo
    const expectedPassword = matchedBooking?.password || currentBooking?.password;
    if (expectedPassword && expectedPassword !== password) {
      setStatus("idle");
      setFormError("Incorrect password. Please try again or use 'Forgot Password'.");
      return;
    }

    // Save verified session
    saveSession({ email: typedEmail, mode: "booking" });

    setStatus("success");
    setTimeout(() => router.push(next), 500);
  }

  // Handle WhatsApp OTP Send for Reset Password
  async function handleSendOtp(e: React.FormEvent) {
    e.preventDefault();
    setFormError("");

    const cleanInput = resetIdentifier.trim();
    if (!cleanInput || cleanInput.length < 6) {
      setFormError("Please enter your registered WhatsApp phone number or email.");
      return;
    }

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 700));

    // Check if user exists in all_bookings or current booking
    let foundEmail = "";
    try {
      const allBookings = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
      const matched = allBookings.find(
        (b: any) =>
          (b.phone && b.phone.replace(/[^0-9]/g, "").includes(cleanInput.replace(/[^0-9]/g, ""))) ||
          (b.email && b.email.toLowerCase().trim() === cleanInput.toLowerCase())
      );
      if (matched) foundEmail = matched.email;
    } catch {}

    const cur = getBooking();
    if (!foundEmail && cur) {
      if (
        (cur.phone && cur.phone.replace(/[^0-9]/g, "").includes(cleanInput.replace(/[^0-9]/g, ""))) ||
        (cur.email && cur.email.toLowerCase().trim() === cleanInput.toLowerCase())
      ) {
        foundEmail = cur.email;
      }
    }

    // Default to cleanInput if testing
    if (foundEmail) {
      setEmail(foundEmail);
    }

    setStatus("idle");
    setOtpSent(true);
  }

  // Handle Password Reset Submission via WhatsApp OTP
  async function handleResetPassword(e: React.FormEvent) {
    e.preventDefault();
    if (enteredOtp !== "1234" && enteredOtp.length !== 4) {
      setFormError("Invalid WhatsApp OTP. (Testing OTP: 1234)");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setFormError("New password must be at least 6 characters.");
      return;
    }

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 600));

    const cleanInput = resetIdentifier.trim();

    // 1. Update password in all_bookings array by phone or email
    try {
      const allBookings = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
      const updated = allBookings.map((b: any) => {
        const matchesPhone = b.phone && b.phone.replace(/[^0-9]/g, "").includes(cleanInput.replace(/[^0-9]/g, ""));
        const matchesEmail = b.email && b.email.toLowerCase().trim() === cleanInput.toLowerCase();
        if (matchesPhone || matchesEmail) {
          return { ...b, password: newPassword };
        }
        return b;
      });
      localStorage.setItem("eiy:all_bookings", JSON.stringify(updated));
    } catch {}

    // 2. Update password in current booking if matched
    const b = getBooking();
    if (b) {
      b.password = newPassword;
      localStorage.setItem("eiy:booking", JSON.stringify(b));
    }

    setStatus("idle");
    setResetSuccess(true);
    setTimeout(() => {
      setResetSuccess(false);
      setMode("login");
      setOtpSent(false);
      setPassword(newPassword);
    }, 1500);
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="rounded-[2rem] bg-cream p-8 shadow-[0_24px_50px_-34px_rgba(73,55,47,.6)] sm:p-10 border border-forest/10">
        {mode === "login" ? (
          <form onSubmit={onSubmit} noValidate className="space-y-5" autoComplete="off">
            <div className="text-center pb-2">
              <h2 className="font-serif text-2xl font-medium text-forest">Cohort Member Login</h2>
              <p className="mt-1 text-xs text-forest/70">
                Exclusive portal for 30-Day Cohort students to track daily live sessions.
              </p>
            </div>

            {formError && (
              <div role="alert" className="rounded-2xl bg-rose-50 border border-rose-200 p-4 text-xs font-medium text-rose-800">
                <p className="font-semibold">{formError}</p>
                {formError.includes("No active 30-Day") && (
                  <Link href="/booking" className="mt-2 inline-block font-bold text-forest underline">
                    Click here to Enroll in 30-Day Cohort →
                  </Link>
                )}
                {formError.includes("Free Trial") && (
                  <Link href="/my-pass" className="mt-2 inline-block font-bold text-forest underline">
                    Go to My Session (Free Trial) →
                  </Link>
                )}
              </div>
            )}

            {status === "success" && (
              <p role="status" className="rounded-2xl bg-forest/10 text-forest px-4 py-3 text-sm font-semibold">
                Credentials verified! Opening your 30-day journey…
              </p>
            )}

            <div>
              <Input
                id="login-member-email"
                name="member_portal_email_no_autofill"
                type="email"
                label="Registered Member Email"
                autoComplete="new-password"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                  setFormError("");
                }}
                error={error}
                disabled={status !== "idle"}
                placeholder="Enter your registered email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-forest uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setMode("forgot");
                    setFormError("");
                  }}
                  className="text-xs text-sage hover:text-forest underline transition"
                >
                  Forgot password?
                </button>
              </div>

              <div className="relative">
                <input
                  id="login-member-password"
                  name="member_portal_password_no_autofill"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setFormError("");
                  }}
                  disabled={status !== "idle"}
                  placeholder="Enter your password"
                  className="w-full rounded-2xl border border-forest/20 bg-sand/30 px-4 py-3 pr-12 text-sm text-forest focus:border-forest focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-forest/50 hover:text-forest transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full" disabled={status !== "idle"}>
              {status === "loading" ? "Verifying…" : "Log In to 30-Day Portal"}
            </Button>
          </form>
        ) : (
          /* FORGOT PASSWORD WITH WHATSAPP OTP FORM */
          <div className="space-y-5">
            <div className="text-center pb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider mb-2">
                <span>💬 WhatsApp Verification</span>
              </span>
              <h2 className="font-serif text-2xl font-medium text-forest">Reset Password</h2>
              <p className="mt-1 text-xs text-forest/70">
                Receive an instant 4-digit verification code directly on your WhatsApp.
              </p>
            </div>

            {formError && (
              <div role="alert" className="rounded-2xl bg-rose-50 border border-rose-200 p-3 text-xs font-medium text-rose-800">
                {formError}
              </div>
            )}

            {resetSuccess && (
              <div role="status" className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-semibold text-emerald-800 text-center">
                Password successfully reset! Redirecting to login…
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label htmlFor="reset-identifier" className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Registered WhatsApp Number
                  </label>
                  <input
                    id="reset-identifier"
                    type="text"
                    value={resetIdentifier}
                    onChange={(e) => setResetIdentifier(e.target.value)}
                    placeholder="+91 98765 43210 or your email"
                    className="w-full rounded-2xl border border-forest/20 bg-sand/30 px-4 py-3 text-sm text-forest focus:outline-none focus:border-forest"
                    required
                  />
                  <p className="mt-1.5 text-[11px] text-forest/65">
                    We will send an instant security code to this WhatsApp number.
                  </p>
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Sending WhatsApp OTP…" : "Send WhatsApp OTP"}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900">
                  <p className="font-semibold">WhatsApp OTP Sent!</p>
                  <p className="mt-0.5 text-[11px] text-emerald-800">
                    A 4-digit code was delivered to <strong>{resetIdentifier}</strong>. (Demo Testing Code: <strong>1234</strong>)
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Enter 4-Digit WhatsApp OTP
                  </label>
                  <input
                    type="text"
                    maxLength={4}
                    value={enteredOtp}
                    onChange={(e) => setEnteredOtp(e.target.value)}
                    placeholder="1234"
                    className="w-full text-center tracking-widest font-mono text-xl rounded-2xl border border-forest/20 bg-sand/30 py-3 text-forest focus:outline-none focus:border-forest"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-forest uppercase tracking-wider mb-1">
                    Create New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full rounded-2xl border border-forest/20 bg-sand/30 px-4 py-3 text-sm text-forest focus:outline-none focus:border-forest"
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={status === "loading"}>
                  {status === "loading" ? "Updating Password…" : "Reset & Save Password"}
                </Button>
              </form>
            )}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode("login");
                  setFormError("");
                }}
                className="text-xs font-semibold text-forest underline hover:text-sage"
              >
                ← Back to Login
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
