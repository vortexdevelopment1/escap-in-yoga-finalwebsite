/** Placeholder daily focus titles. Replace with the real 30-day plan. */
const THEMES = [
  "Arrive and breathe",
  "Ground through the feet",
  "Open the hips",
  "Build steady strength",
  "Lengthen the spine",
  "Rest and reset",
];

export function journeyTitle(day: number): string {
  return THEMES[(day - 1) % THEMES.length];
}
