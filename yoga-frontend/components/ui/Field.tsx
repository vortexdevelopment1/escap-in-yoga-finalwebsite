import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

interface Shared { id: string; label: string; error?: string | null; hint?: string }

const cls = (error?: string | null) =>
  `w-full rounded-2xl border bg-cream px-4 py-3 text-base text-brown placeholder:text-brown/40 transition focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30 disabled:opacity-60 ${error ? "border-red-700" : "border-brown/20"}`;

function Wrap({ id, label, error, hint, children }: Shared & { children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-1.5 text-sm text-brown/70">{hint}</p>}
      {error && <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm font-medium text-red-800">{error}</p>}
    </div>
  );
}
const describe = (id: string, error?: string | null, hint?: string) => (error ? `${id}-error` : hint ? `${id}-hint` : undefined);

export function Input({ id, label, error, hint, ...rest }: Shared & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint}>
      <input id={id} name={id} aria-invalid={!!error} aria-describedby={describe(id, error, hint)} className={cls(error)} {...rest} />
    </Wrap>
  );
}

export function Textarea({ id, label, error, hint, ...rest }: Shared & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Wrap id={id} label={label} error={error} hint={hint}>
      <textarea id={id} name={id} rows={5} aria-invalid={!!error} aria-describedby={describe(id, error, hint)} className={cls(error)} {...rest} />
    </Wrap>
  );
}

export function EmptyState({ title, children, action }: { title: string; children?: ReactNode; action?: ReactNode }) {
  return (
    <div className="mx-auto max-w-lg rounded-[2rem] border border-dashed border-brown/25 bg-cream/70 px-8 py-14 text-center">
      <h2 className="text-2xl">{title}</h2>
      {children && <p className="mt-3 text-brown/80">{children}</p>}
      {action && <div className="mt-7 flex justify-center">{action}</div>}
    </div>
  );
}
