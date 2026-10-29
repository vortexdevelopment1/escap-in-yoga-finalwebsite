export type Level = "All levels" | "Beginner" | "Beginner to intermediate" | "Intermediate";

export interface YogaClass {
  slug: string;
  name: string;
  duration: string;
  level: Level;
  short: string;
  description: string;
  benefits: string[];
  image: string;
}

export type PostureCategory = "Grounding" | "Strength" | "Balance" | "Release";

export interface Posture {
  slug: string;
  name: string;
  sanskrit: string;
  category: PostureCategory;
  level: Level;
  description: string;
  benefits: string[];
  image: string;
}

/** A recurring weekly batch. day: 0 = Sunday … 6 = Saturday. time: 24h "HH:mm". */
export interface Batch {
  id: string;
  classSlug: string;
  day: number;
  time: string;
  label: string;
}

export interface Booking {
  classSlug: string;
  className: string;
  dateISO: string;
  batchId: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  planType?: "FREE_TRIAL" | "30_DAY_COHORT";
  password?: string;
  createdAt: string;
}

export interface StoredSession {
  email: string;
  name?: string;
  mode: "demo" | "booking";
}

export interface MemberProfile {
  name: string;
  email: string;
  phone: string;
  className: string;
  time: string;
  startDate: Date;
  mode: "demo" | "booking";
}

export type DayStatus = "completed" | "today" | "locked";

export interface JourneyDay {
  n: number;
  date: Date;
  status: DayStatus;
  title: string;
}
