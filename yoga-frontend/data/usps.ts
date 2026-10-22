export interface USPItem {
  id: string;
  badge: string;
  title: string;
  description: string;
  highlight: string;
}

export const uspItems: USPItem[] = [
  {
    id: "personal-guidance",
    badge: "Personal Attention",
    title: "Real-Time Alignment Corrections",
    description: "Unlike static recorded videos, our live cohort sessions feature close instructor observation with micro-adjustments tailored to your body's flexibility and anatomy.",
    highlight: "Max 15 students per batch",
  },
  {
    id: "structured-journey",
    badge: "Habit Architecture",
    title: "30-Day Step-by-Step Progress",
    description: "Build a lasting daily routine with a progressive curriculum. Each day builds upon the previous, transitioning smoothly from foundational breathwork to empowering flows.",
    highlight: "Daily milestone tracking",
  },
  {
    id: "holistic-integration",
    badge: "Mind & Body",
    title: "Pranayama + Asana + Stillness",
    description: "A complete yogic practice combining physiological strength, nervous system regulation through breathwork, and deep guided meditation to clear mental fatigue.",
    highlight: "Rooted in authentic tradition",
  },
  {
    id: "schedule-freedom",
    badge: "Flexible Living",
    title: "Adaptive Morning & Evening Batches",
    description: "Life gets busy. Easily switch between morning energizing flows and evening winding-down sessions directly through your member portal whenever your week changes.",
    highlight: "Replays & batch flexibility",
  },
];
