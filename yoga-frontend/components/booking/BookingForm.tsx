import { Input } from "@/components/ui/Field";

export interface DetailsValues {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

export type DetailsErrors = Partial<Record<keyof DetailsValues, string | null>>;

interface Props {
  values: DetailsValues;
  errors: DetailsErrors;
  disabled?: boolean;
  planType: "FREE_TRIAL" | "30_DAY_COHORT";
  onChange: (field: keyof DetailsValues, value: string) => void;
  onGeneratePassword?: () => void;
}

export default function BookingForm({ values, errors, disabled, planType, onChange, onGeneratePassword }: Props) {
  const isCohort = planType === "30_DAY_COHORT";

  return (
    <div className="space-y-5">
      <Input
        id="name"
        label="Full name"
        autoComplete="name"
        value={values.name}
        error={errors.name}
        disabled={disabled}
        onChange={(e) => onChange("name", e.target.value)}
      />
      <Input
        id="email"
        type="email"
        label="Email address"
        autoComplete="email"
        value={values.email}
        error={errors.email}
        disabled={disabled}
        hint={
          isCohort
            ? "Your 30-day journey and member login will be linked to this email."
            : "Your 1-day Free Trial Zoom access will be tied to this email."
        }
        onChange={(e) => onChange("email", e.target.value)}
      />
      <Input
        id="phone"
        type="tel"
        label="WhatsApp Phone Number"
        autoComplete="tel"
        placeholder="+91 98765 43210"
        value={values.phone}
        error={errors.phone}
        disabled={disabled}
        hint="Live class link and session reminders will be sent here."
        onChange={(e) => onChange("phone", e.target.value)}
      />

      {/* Password creation & auto-generation for 30-Day Cohort Members */}
      {isCohort ? (
        <div className="pt-2 border-t border-forest/10 space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="text-xs font-semibold text-forest/80 uppercase tracking-wider">
              Set Member Password
            </label>
            {onGeneratePassword && (
              <button
                type="button"
                onClick={onGeneratePassword}
                className="text-xs font-semibold text-forest hover:text-sage underline flex items-center gap-1 transition"
              >
                <span>⚡ Auto-Generate Strong Password</span>
              </button>
            )}
          </div>
          <Input
            id="password"
            type="text"
            label=""
            autoComplete="new-password"
            placeholder="Create password (min 6 chars) or click auto-generate"
            value={values.password || ""}
            error={errors.password}
            disabled={disabled}
            hint="Set your password to log into the Member Area and track daily progress."
            onChange={(e) => onChange("password", e.target.value)}
          />
        </div>
      ) : (
        <div className="rounded-2xl bg-forest/5 p-4 border border-forest/10 text-xs text-forest/70">
          <span className="font-semibold text-forest">No Password Needed:</span> Free Trial class is instant. You don&apos;t need to remember any password.
        </div>
      )}
    </div>
  );
}
