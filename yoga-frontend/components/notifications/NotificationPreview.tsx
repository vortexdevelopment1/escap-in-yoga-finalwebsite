import { ChatIcon } from "@/components/ui/Icons";

interface Props { phone?: string; className?: string; time?: string }

/** Frontend representation of the WhatsApp notifications. Nothing is sent from this demo. */
export default function NotificationPreview({ phone, className = "your class", time = "your session" }: Props) {
  const items = [
    { title: "Booking confirmation", text: `Your ${className} booking will be confirmed on your registered WhatsApp number${phone ? ` (${phone})` : ""}.` },
    { title: "Payment receipt", text: "A payment receipt will be shared on WhatsApp once payments are connected." },
    { title: "Class reminder", text: `A reminder will be sent before ${time}.` },
  ];
  return (
    <div>
      <ul className="grid gap-3 md:grid-cols-3">
        {items.map((i) => (
          <li key={i.title} className="rounded-3xl bg-cream p-5">
            <p className="flex items-center gap-2 font-semibold"><ChatIcon className="text-terracotta-dark" width={18} height={18} />{i.title}</p>
            <p className="mt-2 text-sm text-brown/80">{i.text}</p>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-sm text-brown/65">Preview only. No WhatsApp messages are sent from this frontend demo.</p>
    </div>
  );
}
