import { formatDay, formatTime, fromISODate } from "@/lib/dates";

interface Props {
  className: string;
  label: string;
  dateISO: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  planType: "FREE_TRIAL" | "30_DAY_COHORT";
  onPlanChange: (plan: "FREE_TRIAL" | "30_DAY_COHORT") => void;
  onEdit?: (step: number) => void;
}

export default function BookingSummary({
  className,
  label,
  dateISO,
  time,
  name,
  email,
  phone,
  planType,
  onPlanChange,
  onEdit,
}: Props) {
  const rows: [string, string, number][] = [
    ["Class", `${className} (${label})`, 1],
    ["Start date", formatDay(fromISODate(dateISO)), 2],
    ["Time", formatTime(time), 3],
    ["Name", name, 4],
    ["Email", email, 4],
    ["WhatsApp", phone, 4],
  ];

  return (
    <div className="space-y-6">
      {/* Plan Selection Box */}
      <div className="rounded-3xl border border-forest/15 bg-white p-5 sm:p-6 shadow-sm">
        <p className="text-xs font-semibold tracking-wider text-forest/70 uppercase">
          Select Your Plan
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {/* Option 1: Free Trial */}
          <button
            type="button"
            onClick={() => onPlanChange("FREE_TRIAL")}
            className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all ${
              planType === "FREE_TRIAL"
                ? "border-forest bg-forest/5 shadow-sm"
                : "border-forest/10 hover:border-forest/30"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-serif font-medium text-forest text-base sm:text-lg">
                Basic (Free Live Class)
              </span>
              <span className="rounded-full bg-sage/20 px-2 py-0.5 text-xs font-bold text-forest">
                ₹0
              </span>
            </div>
            <p className="mt-1 text-xs text-forest/70">
              1 Live session · 1 email limit · Real-time corrections
            </p>
          </button>

          {/* Option 2: 30-Day Cohort */}
          <button
            type="button"
            onClick={() => onPlanChange("30_DAY_COHORT")}
            className={`flex flex-col text-left p-4 rounded-2xl border-2 transition-all ${
              planType === "30_DAY_COHORT"
                ? "border-forest bg-forest/5 shadow-sm"
                : "border-forest/10 hover:border-forest/30"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <span className="font-serif font-medium text-forest text-base sm:text-lg">
                30-Day Cohort Journey
              </span>
              <span className="rounded-full bg-forest text-cream px-2 py-0.5 text-xs font-bold">
                Full Plan
              </span>
            </div>
            <p className="mt-1 text-xs text-forest/70">
              30 Live batches · Daily unlocking · Replays included
            </p>
          </button>
        </div>
      </div>

      {/* Booking Details Table */}
      <dl className="divide-y divide-forest/10 rounded-3xl bg-sand/80 px-6 border border-forest/10">
        {rows.map(([k, v, step]) => (
          <div key={k} className="flex items-center justify-between gap-4 py-3.5">
            <dt className="text-sm text-forest/70">{k}</dt>
            <dd className="flex items-center gap-4 text-right font-medium text-forest">
              <span className="break-all">{v}</span>
              {onEdit && (
                <button
                  type="button"
                  onClick={() => onEdit(step)}
                  className="text-xs font-semibold text-forest underline underline-offset-4 hover:text-sage"
                >
                  Edit<span className="sr-only"> {k}</span>
                </button>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
