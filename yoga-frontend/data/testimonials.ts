export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  journeyMilestone: string;
  tag: "Beginner" | "Work-Life Balance" | "Physical Recovery" | "Mental Clarity";
}

export const testimonials: Testimonial[] = [
  {
    id: "review-1",
    name: "Ananya Sharma",
    role: "Product Designer & Mother",
    location: "Bengaluru",
    quote: "The 7 AM sessions gave me my energy back. Avani's posture cues changed how I sit all day.",
    rating: 5,
    journeyMilestone: "Day 30 Graduate",
    tag: "Work-Life Balance",
  },
  {
    id: "review-2",
    name: "Rohan Mehta",
    role: "Software Engineering Lead",
    location: "Mumbai",
    quote: "Desk work gave me constant neck stiffness. The gentle spine openers relieved my aches in days.",
    rating: 5,
    journeyMilestone: "6 Months Member",
    tag: "Physical Recovery",
  },
  {
    id: "review-3",
    name: "Dr. Priyamvada Sen",
    role: "Physician",
    location: "New Delhi",
    quote: "Avani catches minute posture angles through the screen. It truly feels like private studio coaching.",
    rating: 5,
    journeyMilestone: "Day 30 Graduate",
    tag: "Mental Clarity",
  },
  {
    id: "review-4",
    name: "Vikram Kulkarni",
    role: "Marathon Runner",
    location: "Pune",
    quote: "I joined for hamstring mobility for marathon training. I stayed for the calm. Yin Yoga is now an essential part of my weekly recovery.",
    rating: 5,
    journeyMilestone: "1 Year Member",
    tag: "Physical Recovery",
  },
  {
    id: "review-5",
    name: "Sneha Nair",
    role: "Content Strategist",
    location: "Hyderabad",
    quote: "I was a total beginner who had never touched a yoga mat. The welcoming pace and clear steps made me fall in love with daily morning movement.",
    rating: 5,
    journeyMilestone: "Day 24 of 30",
    tag: "Beginner",
  },
  {
    id: "review-6",
    name: "Karan Singhal",
    role: "Fintech Entrepreneur",
    location: "Gurugram",
    quote: "The 30-day progressive structure kept me accountable. My sleep quality improved in week two and mental clarity throughout my workday is noticeably sharper.",
    rating: 5,
    journeyMilestone: "Day 30 Graduate",
    tag: "Mental Clarity",
  },
];
