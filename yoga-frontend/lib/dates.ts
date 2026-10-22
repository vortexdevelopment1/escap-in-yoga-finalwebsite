export const DAY_MS = 86_400_000;
export const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"] as const;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const pad = (n: number) => String(n).padStart(2, "0");

export function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
export function addDays(d: Date, n: number): Date {
  const x = new Date(d);
  x.setDate(x.getDate() + n);
  return x;
}
export function daysBetween(a: Date, b: Date): number {
  return Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / DAY_MS);
}
export function toISODate(d: Date): string {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
export function fromISODate(s: string): Date {
  const [y, m, d] = s.split("-").map(Number);
  return new Date(y, m - 1, d);
}
export function nextDateForWeekday(weekday: number, from: Date = new Date()): Date {
  const t = startOfDay(from);
  return addDays(t, (weekday - t.getDay() + 7) % 7);
}
export function formatDay(d: Date): string {
  return `${WEEKDAYS[d.getDay()]}, ${pad(d.getDate())} ${MONTHS[d.getMonth()]}`;
}
export function formatShort(d: Date): string {
  return `${pad(d.getDate())} ${MONTHS[d.getMonth()].slice(0, 3)}`;
}
export function formatRange(a: Date, b: Date): string {
  return `${pad(a.getDate())} ${MONTHS[a.getMonth()]} — ${pad(b.getDate())} ${MONTHS[b.getMonth()]}`;
}
export function formatTime(t: string): string {
  const [h, m] = t.split(":").map(Number);
  return `${pad(h % 12 || 12)}:${pad(m)} ${h >= 12 ? "PM" : "AM"}`;
}
export function splitCountdown(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60 };
}
export function formatCompact(ms: number): string {
  const { days, hours, minutes, seconds } = splitCountdown(ms);
  const clock = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  return days > 0 ? `${days}d ${clock}` : clock;
}
