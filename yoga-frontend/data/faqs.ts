export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Getting Started" | "Sessions & Batches" | "Health & Safety" | "Memberships & Billing";
  featured?: boolean; // For homepage 4-5 featured questions
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    question: "I am a complete beginner and not flexible at all. Can I join?",
    answer: "Absolutely! Yoga is not about touching your toes—it's about learning to connect your breath and movement at your own pace. All our sessions offer tiered modifications, so beginners and seasoned practitioners can practice side-by-side with confidence.",
    category: "Getting Started",
    featured: true,
  },
  {
    id: "faq-2",
    question: "What equipment or props do I need for the online sessions?",
    answer: "You only need a non-slip yoga mat, comfortable stretchable clothing, and a water bottle. Props like yoga blocks, a strap, or a firm cushion can be helpful for support, but household alternatives (like a towel or thick books) work just as well.",
    category: "Getting Started",
    featured: true,
  },
  {
    id: "faq-3",
    question: "How do live online sessions work and how do I receive links?",
    answer: "Sessions are conducted live via secure Zoom conferences. Once you book a batch or subscribe, your daily access link activates in your member portal 15 minutes before class start time. You'll also receive friendly reminder alerts so you never miss a class.",
    category: "Sessions & Batches",
    featured: true,
  },
  {
    id: "faq-4",
    question: "What happens if I miss a scheduled live class?",
    answer: "We understand unexpected work or family commitments arise. Members get on-demand access to guided daily journey routines and practice recordings in the member dashboard, ensuring your 30-day streak stays unbroken.",
    category: "Sessions & Batches",
    featured: true,
  },
  {
    id: "faq-5",
    question: "Can I switch my batch time between morning and evening?",
    answer: "Yes, you have full flexibility. If your routine shifts during the week, you can switch between morning and evening batches through your member portal or by reaching out to our support team.",
    category: "Sessions & Batches",
    featured: true,
  },
  {
    id: "faq-6",
    question: "How does the 30-day member journey work?",
    answer: "Our 30-day journey is a thoughtfully paced roadmap designed to build lifelong mindfulness. Each day unlocks a specific focus—from foundational alignment to nervous system decompression and vitality flows—with progress tracking along the way.",
    category: "Memberships & Billing",
  },
  {
    id: "faq-7",
    question: "Do I need to keep my video camera turned on during live classes?",
    answer: "We highly recommend keeping your camera on so Avani can observe your postures, spinal alignment, and breathing to give gentle, real-time verbal cues. However, if you feel private or shy initially, having your video off is completely respected.",
    category: "Sessions & Batches",
  },
  {
    id: "faq-8",
    question: "Can I practice if I have back pain, neck stiffness, or an old joint injury?",
    answer: "Yes! Yoga is one of the most effective holistic practices for alleviating chronic desk-work stiffness. Please mention any prior injuries or restrictions in your onboarding form so Avani can offer safe contraindications and tailored props.",
    category: "Health & Safety",
  },
  {
    id: "faq-9",
    question: "What should I eat or drink before attending morning yoga?",
    answer: "It is best to practice on an empty stomach or at least 2–3 hours after a heavy meal. For early morning batches, warm water or a small sip of herbal tea or a date/almond 30 minutes before class is ideal.",
    category: "Health & Safety",
  },
  {
    id: "faq-10",
    question: "Is hot yoga safe for beginners or people with low blood pressure?",
    answer: "Our hot yoga sessions focus on gentle warmth rather than extreme oppressive heat. If you experience dizziness or low blood pressure, take frequent Child's Pose rests and drink electrolyte water. Listen to your body above all else.",
    category: "Health & Safety",
  },
  {
    id: "faq-11",
    question: "Can pregnant practitioners join regular sessions?",
    answer: "Standard cohort flows are not designed for prenatal care. If you are pregnant, please consult your physician and message us directly so we can connect you with specialized prenatal one-on-one sessions.",
    category: "Health & Safety",
  },
  {
    id: "faq-12",
    question: "What payment methods are supported for bookings?",
    answer: "We support all major payment modes including direct UPI (Google Pay, PhonePe, Paytm), Credit & Debit cards, and Net Banking with instant automated confirmation.",
    category: "Memberships & Billing",
  },
  {
    id: "faq-13",
    question: "Can I pause my 30-day membership if I travel or fall ill?",
    answer: "Yes. Members can request a freeze of up to 10 days for unforeseen travel or health reasons. Just ping us through your member portal or contact form, and your journey timer will pause accordingly.",
    category: "Memberships & Billing",
  },
  {
    id: "faq-14",
    question: "Will Avani provide personal posture feedback during the class?",
    answer: "Yes! We deliberately cap every live cohort to a maximum of 15 practitioners. This ensures Avani can give individual verbal corrections and answer quick alignment questions before and after every session.",
    category: "Getting Started",
  },
];
