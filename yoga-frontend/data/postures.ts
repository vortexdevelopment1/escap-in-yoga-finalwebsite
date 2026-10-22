import type { Posture, PostureCategory } from "@/types";

export const postureCategories: ("All" | PostureCategory)[] = ["All", "Grounding", "Strength", "Balance", "Release"];

export const postures: Posture[] = [
    {
    slug: "warrior-i",
    name: "High Lunge / Warrior I",
    sanskrit: "Virabhadrasana I",
    category: "Strength",
    level: "Beginner",
    description: "A powerful standing pose with arms reaching skyward, building focus and lower-body stability.",
    benefits: ["Builds leg and ankle strength", "Stretches chest, lungs, and shoulders", "Improves balance and focus"],
    image: "/images/posture-lunge.jpg"
  },
  {
    slug: "camel",
    name: "Camel Pose",
    sanskrit: "Ustrasana",
    category: "Strength",
    level: "Intermediate",
    description: "A kneeling heart-opening backbend that strengthens the back muscles while opening the front body.",
    benefits: ["Opens chest, shoulders, and abdomen", "Strengthens back body and thighs", "Boosts energy and posture"],
    image: "/images/posture-camel.jpg"
  },
  {
    slug: "updog",
    name: "Upward-Facing Dog",
    sanskrit: "Urdhva Mukha Svanasana",
    category: "Strength",
    level: "Beginner",
    description: "Lifting the chest and shoulders while grounding through the hands and tops of the feet.",
    benefits: ["Strengthens the spine and arms", "Opens the chest and lungs", "Stimulates abdominal organs"],
    image: "/images/posture-updog.jpg"
  },
   {
    slug: "pigeon",
    name: "King Pigeon Pose",
    sanskrit: "Eka Pada Rajakapotasana",
    category: "Release",
    level: "Intermediate",
    description: "A deep hip opener and heart-expanding backbend that stretches the thighs, hips, and chest.",
    benefits: ["Opens deep hip flexors and chest", "Increases spinal mobility", "Encourages deep conscious breathing"],
    image: "/images/posture-pigeon.jpg"
  },
  {
    slug: "seated-twist",
    name: "Half Lord of the Fishes",
    sanskrit: "Ardha Matsyendrasana",
    category: "Release",
    level: "Beginner",
    description: "A restorative seated twist that restores spinal flexibility and massages internal organs.",
    benefits: ["Promotes spinal rotation and flexibility", "Cleanses and stimulates digestion", "Relieves lower back tension"],
    image: "/images/posture-twist.jpg"
  },
  {
    slug: "tree",
    name: "Tree Pose",
    sanskrit: "Vrksasana",
    category: "Balance",
    level: "Beginner",
    description: "Balancing on one leg with hands reaching upward, cultivating steady presence and alignment.",
    benefits: ["Practises steadiness and focus", "Strengthens the standing leg", "Invites calm, even breathing"],
    image: "/images/posture-tree.jpg"
  },
];
