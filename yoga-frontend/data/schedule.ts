import type { Batch } from "@/types";

const b = (classSlug: string, day: number, time: string, label: string): Batch => ({
  id: `${classSlug}-${day}-${time.replace(":", "")}`,
  classSlug,
  day,
  time,
  label,
});

/**
 * Escape in Yoga Batches:
 * Strictly Monday to Friday (1 to 5)
 * 3 Morning Slots (55 mins each):
 *  - 06:00 AM (06:00 - 06:55 AM)
 *  - 07:00 AM (07:00 - 07:55 AM)
 *  - 08:00 AM (08:00 - 08:55 AM)
 *
 * All 6 yoga styles are evenly scheduled across the weekdays so no day is empty.
 */
export const batches: Batch[] = [
  // Monday (1)
  b("hatha-yoga", 1, "06:00", "Morning Flow (55 mins)"),
  b("vinyasa-yoga", 1, "07:00", "Sunrise Vinyasa (55 mins)"),
  b("meditation", 1, "08:00", "Mindfulness & Breath (55 mins)"),

  // Tuesday (2)
  b("hatha-yoga", 2, "06:00", "Morning Flow (55 mins)"),
  b("vinyasa-yoga", 2, "07:00", "Sunrise Vinyasa (55 mins)"),
  b("yin-yoga", 2, "08:00", "Deep Stretch & Mobility (55 mins)"),

  // Wednesday (3)
  b("hatha-yoga", 3, "06:00", "Morning Flow (55 mins)"),
  b("hot-yoga", 3, "07:00", "Midweek Heat & Core (55 mins)"),
  b("meditation", 3, "08:00", "Breathwork & Meditation (55 mins)"),

  // Thursday (4)
  b("vinyasa-yoga", 4, "06:00", "Sunrise Vinyasa (55 mins)"),
  b("hatha-yoga", 4, "07:00", "Alignment & Posture (55 mins)"),
  b("breathwork", 4, "08:00", "Pranayama & Calming Flow (55 mins)"),

  // Friday (5)
  b("hatha-yoga", 5, "06:00", "Morning Flow (55 mins)"),
  b("vinyasa-yoga", 5, "07:00", "Dynamic Flow (55 mins)"),
  b("yin-yoga", 5, "08:00", "Weekend Restorative Unwind (55 mins)"),
];

export const batchesForDay = (day: number) =>
  batches.filter((x) => x.day === day).sort((a, c) => a.time.localeCompare(c.time));

export const batchesForClass = (slug: string) =>
  batches.filter((x) => x.classSlug === slug);

export const getBatch = (id: string) => batches.find((x) => x.id === id);

export const scheduleDayOrder = [1, 2, 3, 4, 5];
