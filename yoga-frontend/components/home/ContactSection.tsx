import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/Icons";
import ContactForm from "./ContactForm";

const details = [
  { Icon: MailIcon, label: "Email", value: "hello@escapeinyoga.example" },
  { Icon: PhoneIcon, label: "Phone", value: "+91 00000 00000" },
  { Icon: PinIcon, label: "Location", value: "Studio address placeholder" },
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-peach/50 py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <Reveal>
          <SectionHeading eyebrow="Contact" title="Questions before you book?" description="Send a note and the studio will get back to you. Contact details below are placeholders to replace." />
          <ul className="mt-10 space-y-5">
            {details.map(({ Icon, label, value }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cream text-terracotta-dark"><Icon /></span>
                <div><p className="text-sm text-brown/70">{label}</p><p className="font-medium">{value}</p></div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal delay={100}><ContactForm /></Reveal>
      </div>
    </section>
  );
}
