export function validateName(v: string): string | null {
  const t = v.trim();
  if (!t) return "Enter your full name.";
  if (t.length < 2) return "Name must be at least 2 characters.";
  return null;
}
export function validateEmail(v: string): string | null {
  const t = v.trim();
  if (!t) return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(t)) return "Enter a valid email, like name@example.com.";
  return null;
}
export function validatePhone(v: string): string | null {
  const t = v.trim();
  if (!t) return "Enter your phone number.";
  if (!/^[+\d][\d\s-]*$/.test(t)) return "Use digits only. A leading + is fine.";
  const digits = t.replace(/\D/g, "");
  if (digits.length < 10 || digits.length > 13) return "Enter a phone number with 10 to 13 digits.";
  return null;
}
export function validateMessage(v: string): string | null {
  if (!v.trim()) return "Write a short message.";
  if (v.trim().length < 10) return "Message must be at least 10 characters.";
  return null;
}
export function validatePassword(v: string): string | null {
  if (!v) return "Enter your password.";
  if (v.length < 6) return "Password must be at least 6 characters.";
  return null;
}
