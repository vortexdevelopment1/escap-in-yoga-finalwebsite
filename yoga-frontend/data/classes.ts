import type { YogaClass } from "@/types";

export const classes: YogaClass[] = [
  {
    slug: "hatha-yoga", name: "Hatha Yoga", duration: "60 minutes", level: "Beginner",
    short: "Slow, steady postures held with attention to alignment and breath.",
    description: "A grounded practice that moves through foundational postures at an unhurried pace. Ideal for building body awareness and a consistent routine.",
    benefits: ["Builds body awareness", "Encourages steady breathing", "Supports gentle strength and flexibility", "A good starting point for new practitioners"],
    image: "/images/class-hatha.jpg",
  },
  {
    slug: "vinyasa-yoga", name: "Vinyasa Yoga", duration: "60 minutes", level: "Beginner to intermediate",
    short: "Flowing sequences that link breath to movement.",
    description: "Postures connected in a continuous flow, each movement paired with an inhale or exhale. Energising without being rushed.",
    benefits: ["Links breath with movement", "Builds stamina and coordination", "Keeps the mind focused on the present", "Variety from class to class"],
    image: "/images/class-vinyasa.jpg",
  },
  {
    slug: "yin-yoga", name: "Yin Yoga", duration: "75 minutes", level: "All levels",
    short: "Long, quiet holds that invite release and stillness.",
    description: "Floor-based postures held for several minutes with support. A slow counterpart to active practices, made for winding down.",
    benefits: ["Encourages deep relaxation", "Supports flexibility over time", "Teaches patience and stillness", "Balances a busy week"],
    image: "/images/class-yin.jpg",
  },
  {
    slug: "hot-yoga", name: "Hot Yoga", duration: "60 minutes", level: "Beginner to intermediate",
    short: "A focused practice built around heat, breath and mindful movement.",
    description: "Postures practised in a warm room to encourage a sense of openness and focus. Bring water, wear light clothing and move at your own pace.",
    benefits: ["Warmth that helps the body feel open", "Strong focus on breath and posture", "Builds endurance and concentration", "Rewarding, energising finish"],
    image: "/images/class-hot.jpg",
  },
  {
    slug: "meditation", name: "Meditation", duration: "30 minutes", level: "All levels",
    short: "Guided stillness to settle the mind.",
    description: "Seated practice with simple guidance on posture, attention and letting thoughts pass. No experience needed.",
    benefits: ["Cultivates calm and attention", "Easy to fit into a busy day", "Builds a daily habit of stillness", "Pairs well with any movement class"],
    image: "/images/class-meditation.jpg",
  },
  {
    slug: "breathwork", name: "Breathwork", duration: "45 minutes", level: "All levels",
    short: "Guided breathing practices for steadiness and clarity.",
    description: "A gentle introduction to pranayama, exploring different ways of breathing with clear, paced instruction.",
    benefits: ["Improves awareness of breath", "Promotes a sense of calm", "Useful before movement or meditation", "Simple techniques to use anywhere"],
    image: "/images/class-breathwork.jpg",
  },
];

export const getClass = (slug: string) => classes.find((c) => c.slug === slug);
