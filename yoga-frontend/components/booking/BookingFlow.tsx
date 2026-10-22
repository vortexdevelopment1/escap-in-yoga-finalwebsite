"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";
import { classes, getClass } from "@/data/classes";
import { batchesForClass, getBatch } from "@/data/schedule";
import { SUBSCRIPTION } from "@/data/subscription";
import { addDays, formatDay, formatTime, fromISODate, nextDateForWeekday, startOfDay, toISODate } from "@/lib/dates";
import { saveBooking, saveSession } from "@/lib/storage";
import { submitBooking, checkTrialEligibility } from "@/lib/api";
import { validateEmail, validateName, validatePhone } from "@/lib/validation";
import BookingForm, { type DetailsErrors, type DetailsValues } from "./BookingForm";
import BookingSteps from "./BookingSteps";
import BookingSummary from "./BookingSummary";

export default function BookingFlow() {
  const router = useRouter();
  const params = useSearchParams();

  const [state, setState] = useState(() => {
    const batch = getBatch(params.get("batch") ?? "");
    const slug = batch?.classSlug ?? params.get("class") ?? "";
    if (batch) return { step: 4, classSlug: batch.classSlug, dateISO: toISODate(nextDateForWeekday(batch.day)), batchId: batch.id };
    if (getClass(slug)) return { step: 2, classSlug: slug, dateISO: "", batchId: "" };
    return { step: 1, classSlug: "", dateISO: "", batchId: "" };
  });
  const [details, setDetails] = useState<DetailsValues>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<DetailsErrors>({});
  const [planType, setPlanType] = useState<"FREE_TRIAL" | "30_DAY_COHORT">(() => {
    return params.get("plan") === "cohort" ? "30_DAY_COHORT" : "FREE_TRIAL";
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const { step, classSlug, dateISO, batchId } = state;
  const cls = getClass(classSlug);
  const batch = getBatch(batchId);

  // Auto-generate memorable password based on user Name / Phone
  function handleGeneratePassword() {
    let baseName = "Yoga";
    if (details.name.trim()) {
      // First name capitalized without spaces
      const rawFirst = details.name.trim().split(" ")[0].replace(/[^a-zA-Z]/g, "");
      if (rawFirst.length >= 2) {
        baseName = rawFirst.charAt(0).toUpperCase() + rawFirst.slice(1).toLowerCase();
      }
    }

    let digits = "2026";
    const cleanPhone = details.phone.replace(/[^0-9]/g, "");
    if (cleanPhone.length >= 4) {
      // Last 4 digits of student's phone
      digits = cleanPhone.slice(-4);
    } else {
      // 4 random digits
      digits = Math.floor(1000 + Math.random() * 9000).toString();
    }

    // Pattern: Name@1234 (e.g., Neha@8888 or Priya@4321)
    const generated = `${baseName}@${digits}`;
    setDetails((d) => ({ ...d, password: generated }));
    setErrors((prev) => ({ ...prev, password: null }));
  }

  const dates = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 14 }, (_, i) => addDays(today, i));
  }, []);

  const go = (s: number) => {
    setErrorMessage("");
    setState((p) => ({ ...p, step: s }));
  };
  const pickClass = (slug: string) => setState({ step: 2, classSlug: slug, dateISO: "", batchId: "" });
  const pickDate = (iso: string) => setState((p) => ({ ...p, step: 3, dateISO: iso, batchId: "" }));
  const pickBatch = (id: string) => setState((p) => ({ ...p, step: 4, batchId: id }));

  const timesForDate = useMemo(() => {
    if (!dateISO || !classSlug) return [];
    const d = fromISODate(dateISO);
    return batchesForClass(classSlug)
      .filter((b) => b.day === d.getDay())
      .sort((a, b) => a.time.localeCompare(b.time));
  }, [dateISO, classSlug]);

  async function continueFromDetails() {
    const next: DetailsErrors = {
      name: validateName(details.name),
      email: validateEmail(details.email),
      phone: validatePhone(details.phone),
      password:
        planType === "30_DAY_COHORT" && (!details.password || details.password.length < 6)
          ? "Please create a password with at least 6 characters."
          : null,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;

    // Check trial eligibility if plan is Free Trial
    if (planType === "FREE_TRIAL") {
      const eligibility = await checkTrialEligibility(details.email);
      if (!eligibility.eligible) {
        setErrors((prev) => ({
          ...prev,
          email: eligibility.message || "This email is already registered in our system and cannot claim a Free Trial.",
        }));
        return;
      }
    }

    go(5);
  }

  async function confirm() {
    if (!cls || !batch) return;
    setStatus("loading");
    setErrorMessage("");

    try {
      // 1. Send live booking request to Node/Express Backend
      const payload = {
        name: details.name.trim(),
        email: details.email.trim(),
        phone: details.phone.trim(),
        classSlug: cls.slug,
        className: cls.name,
        batchTime: batch.time,
        dateISO,
        planType,
      };

      try {
        await submitBooking(payload);
      } catch (apiErr: any) {
        console.warn("Backend API warning (using local fallback if server offline):", apiErr.message);
        // If server returned specific business logic error (like capacity or trial already claimed)
        if (apiErr.message && !apiErr.message.includes("Failed to fetch")) {
          setErrorMessage(apiErr.message);
          setStatus("error");
          return;
        }
      }

      // 2. Only 30-Day Cohort members get persistent session access for Member Portal
      if (planType === "30_DAY_COHORT") {
        saveSession({ email: details.email.trim(), mode: "booking" });
      }

      // 3. Keep local session cache for confirmation card
      const newBooking = {
        _id: "book-" + Date.now() + "-" + Math.random().toString(36).substring(2, 7),
        classSlug: cls.slug,
        className: cls.name,
        dateISO,
        batchId: batch.id,
        time: batch.time,
        name: details.name.trim(),
        email: details.email.trim(),
        phone: details.phone.trim(),
        planType,
        password: details.password || "",
        createdAt: new Date().toISOString(),
      };
      saveBooking(newBooking);

      // Also append to persistent admin all_bookings list
      try {
        const allSaved = JSON.parse(localStorage.getItem("eiy:all_bookings") || "[]");
        localStorage.setItem("eiy:all_bookings", JSON.stringify([newBooking, ...allSaved]));
      } catch {}

      router.push("/booking/confirmation");
    } catch (err: any) {
      setErrorMessage(err.message || "We couldn't confirm your booking. Please try again.");
      setStatus("error");
    }
  }

  const back = step > 1 ? (
    <Button variant="ghost" onClick={() => go(step - 1)} disabled={status === "loading"}>Back</Button>
  ) : null;

  return (
    <div className="mx-auto max-w-3xl">
      <BookingSteps current={step} />
      <div className="mt-10 rounded-[2rem] bg-cream p-6 shadow-[0_24px_50px_-34px_rgba(73,55,47,.6)] sm:p-10">
        {step === 1 && (
          <section aria-labelledby="s1">
            <h2 id="s1" className="text-3xl font-serif text-forest">Choose your practice</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {classes.map((c) => (
                <button key={c.slug} onClick={() => pickClass(c.slug)} className="rounded-3xl border border-forest/15 p-5 text-left transition hover:border-forest hover:bg-forest/5">
                  <span className="block font-serif text-xl text-forest">{c.name}</span>
                  <span className="mt-1 block text-sm text-forest/70">{c.duration} · {c.level}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 2 && cls && (
          <section aria-labelledby="s2">
            <h2 id="s2" className="text-3xl font-serif text-forest">Choose a start date</h2>
            <p className="mt-2 text-forest/75">{cls.name} runs on selected days. Unavailable dates are disabled.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {dates.map((d) => {
                const iso = toISODate(d);
                const available = batchesForClass(cls.slug).some((b) => b.day === d.getDay());
                return (
                  <button key={iso} disabled={!available} onClick={() => pickDate(iso)} aria-pressed={dateISO === iso}
                    className={`min-h-[64px] rounded-2xl border px-3 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${dateISO === iso ? "border-forest bg-forest text-cream" : "border-forest/15 enabled:hover:border-forest enabled:hover:bg-forest/5 text-forest"}`}>
                    {formatDay(d)}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 3 && cls && (
          <section aria-labelledby="s3">
            <h2 id="s3" className="text-3xl font-serif text-forest">Choose a batch</h2>
            <p className="mt-2 text-forest/75">{cls.name} on {formatDay(fromISODate(dateISO))}</p>
            {timesForDate.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {timesForDate.map((b) => (
                  <button key={b.id} onClick={() => pickBatch(b.id)} aria-pressed={batchId === b.id}
                    className={`rounded-3xl border p-5 text-left transition hover:border-forest hover:bg-forest/5 ${batchId === b.id ? "border-forest bg-forest/5 ring-1 ring-forest" : "border-forest/15"}`}>
                    <span className="block font-serif text-2xl text-forest">{formatTime(b.time)}</span>
                    <span className="text-sm text-forest/70">{b.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-6"><EmptyState title="No batches left on this date" action={<Button variant="secondary" onClick={() => go(2)}>Pick another date</Button>}>Today&rsquo;s morning batches may have already finished.</EmptyState></div>
            )}
          </section>
        )}

        {step === 4 && cls && batch && (
          <section aria-labelledby="s4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
              <h2 id="s4" className="text-3xl font-serif text-forest">Your details</h2>
              {/* Plan Switcher Pills right at details step */}
              <div className="inline-flex rounded-full bg-forest/10 p-1 self-start sm:self-auto">
                <button
                  type="button"
                  onClick={() => setPlanType("FREE_TRIAL")}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition ${
                    planType === "FREE_TRIAL" ? "bg-forest text-cream shadow-sm" : "text-forest/70 hover:text-forest"
                  }`}
                >
                  Free Trial (₹0)
                </button>
                <button
                  type="button"
                  onClick={() => setPlanType("30_DAY_COHORT")}
                  className={`px-3 py-1 text-xs font-semibold rounded-full transition ${
                    planType === "30_DAY_COHORT" ? "bg-forest text-cream shadow-sm" : "text-forest/70 hover:text-forest"
                  }`}
                >
                  30-Day Cohort
                </button>
              </div>
            </div>
            <p className="mt-1 mb-6 text-forest/75">{cls.name} · {formatDay(fromISODate(dateISO))} · {formatTime(batch.time)}</p>
            <BookingForm
              values={details}
              errors={errors}
              disabled={status === "loading"}
              planType={planType}
              onChange={(f, v) => setDetails((d) => ({ ...d, [f]: v }))}
              onGeneratePassword={handleGeneratePassword}
            />
          </section>
        )}

        {step === 5 && cls && batch && (
          <section aria-labelledby="s5">
            <h2 id="s5" className="text-3xl font-serif text-forest">Review your booking</h2>
            <p className="mt-2 mb-6 text-forest/75">Select whether you are claiming your Free Live Class or enrolling in the full 30-Day Cohort.</p>
            <BookingSummary
              className={cls.name}
              label={batch.label}
              dateISO={dateISO}
              time={batch.time}
              planType={planType}
              onPlanChange={setPlanType}
              {...details}
              onEdit={go}
            />
            {status === "error" && (
              <p role="alert" className="mt-5 rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-900">
                {errorMessage || "We couldn't confirm your booking. Check your connection and try again."}
              </p>
            )}
          </section>
        )}

        {(step === 1 || !cls) && step !== 1 && <EmptyState title="Start with a class" action={<Button onClick={() => go(1)}>Choose a class</Button>} />}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>{back}</div>
          {step === 4 && <Button onClick={continueFromDetails} size="lg">Review booking</Button>}
          {step === 5 && (
            <Button onClick={confirm} size="lg" disabled={status === "loading"}>
              {status === "loading"
                ? "Confirming…"
                : planType === "FREE_TRIAL"
                ? "Claim Free Live Class (₹0)"
                : "Confirm 30-Day Cohort"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
