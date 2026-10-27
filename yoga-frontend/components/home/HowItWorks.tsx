import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    num: "01",
    title: "Choose a batch",
    subtitle: "Morning slots that suit your waking rhythm",
    text: "Pick your preferred yoga style and morning slot (6:00, 7:00, or 8:00 AM) that fits your day.",
  },
  {
    num: "02",
    title: "Register your details",
    subtitle: "Simple, effortless reservation",
    text: "Share your name, email and WhatsApp number. Free Trial is instant; 30-Day Cohort creates your member pass.",
  },
  {
    num: "03",
    title: "Receive confirmation",
    subtitle: "Direct class delivery",
    text: "Your place is confirmed on screen, and your live Zoom link and reminders arrive on your WhatsApp.",
  },
  {
    num: "04",
    title: "Practise day by day",
    subtitle: "Guided transformation with Avani",
    text: "Step onto your mat each morning. Each day of your 30-day guided cohort unlocks smoothly in your portal.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative overflow-hidden bg-sand py-20 sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Harmonious Section Heading matching the whole website */}
        <div className="max-w-2xl">
          <p className="inline-flex items-center rounded-full border border-forest/15 bg-white px-3.5 py-1 text-xs font-semibold tracking-wider text-forest uppercase shadow-xs">
            How It Works
          </p>
          <h2 className="mt-4 font-serif text-3xl sm:text-4xl lg:text-5xl font-medium text-forest leading-tight tracking-tight">
            From booking to your <span className="italic text-sage font-normal">first session.</span>
          </h2>
          <p className="mt-3 text-base text-forest/75 leading-relaxed">
            A simple, serene pathway to begin your daily yoga practice with Avani Jain.
          </p>
        </div>

        {/* Minimalist Horizontal Step Trackers */}
        <div className="mt-14 sm:mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 90} className="flex flex-col h-full">
              <div className="relative flex flex-col justify-between h-full rounded-[2rem] bg-white p-7 sm:p-8 border border-forest/10 hover:border-forest/25 transition-all duration-300 shadow-xs hover:shadow-md">
                <div>
                  {/* Step Number in Soft Pill */}
                  <div className="flex items-center justify-between pb-6 border-b border-forest/10 mb-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest/5 font-serif text-sm font-semibold text-forest">
                      {s.num}
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-sage">
                      Step {i + 1}
                    </span>
                  </div>

                  {/* Step Title & Subtitle */}
                  <h3 className="font-serif text-2xl font-medium text-forest">
                    {s.title}
                  </h3>
                  <p className="mt-1 text-xs font-medium text-sage">
                    {s.subtitle}
                  </p>

                  {/* Body Text */}
                  <p className="mt-4 text-xs sm:text-sm text-forest/75 leading-relaxed">
                    {s.text}
                  </p>
                </div>

                {/* Subtle Bottom Dot Line */}
                <div className="mt-8 pt-4 border-t border-forest/5 flex items-center gap-1.5">
                  {[0, 1, 2, 3].map((dot) => (
                    <span
                      key={dot}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        dot === i ? "w-6 bg-forest" : "w-1.5 bg-forest/15"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
