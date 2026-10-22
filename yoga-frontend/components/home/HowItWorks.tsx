import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const steps = [
  { title: "Choose a batch", text: "Pick a class, a date and a time that suits your day." },
  { title: "Register your details", text: "Share your name, email and phone number. Use the same email to log in." },
  { title: "Get your confirmation", text: "Your booking is confirmed on screen. In the live product, confirmations and reminders will also go to your registered WhatsApp number." },
  { title: "Practise day by day", text: "Log in to your member area. Each day of your 30-day journey opens on its own date." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="How it works" title="From booking to your first session" />
        <ol className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 90}>
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-terracotta font-serif text-2xl text-terracotta-dark">{i + 1}</div>
                <h3 className="mt-5 text-2xl">{s.title}</h3>
                <p className="mt-2 text-brown/80">{s.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
