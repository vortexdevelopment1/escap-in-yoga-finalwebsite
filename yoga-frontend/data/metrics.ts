export interface MetricItem {
  value: string;
  label: string;
  description?: string;
}

export const successMetrics: MetricItem[] = [
  {
    value: "5,000+",
    label: "Happy Practitioners",
    description: "Students empowered across mindful live yoga cohorts.",
  },
  {
    value: "30 Days",
    label: "Daily Guided Sessions",
    description: "Progressive daily habit unlocking step by step.",
  },
  {
    value: "4.9/5 ★",
    label: "Community Rating",
    description: "Average score across 850+ verified student reviews.",
  },
  {
    value: "10+ Yrs",
    label: "Teaching Experience",
    description: "Certified foundation in Hatha, Vinyasa & Breathwork.",
  },
];
