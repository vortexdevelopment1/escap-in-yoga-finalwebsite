import type { Booking, StoredSession } from "@/types";

const BOOKING_KEY = "eiy:booking";
const SESSION_KEY = "eiy:session";
const EVENT = "eiy:change";

function read<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}
function write(key: string, value: unknown | null) {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: demo state simply won't persist */
  }
  window.dispatchEvent(new Event(EVENT));
}

export const getBooking = () => read<Booking>(BOOKING_KEY);
export const saveBooking = (b: Booking) => write(BOOKING_KEY, b);
export const getSession = () => read<StoredSession>(SESSION_KEY);
export const saveSession = (s: StoredSession) => write(SESSION_KEY, s);
export const clearSession = () => write(SESSION_KEY, null);

export function subscribe(cb: () => void) {
  window.addEventListener(EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}
