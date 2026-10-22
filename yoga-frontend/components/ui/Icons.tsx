import type { SVGProps } from "react";

const base = (p: SVGProps<SVGSVGElement>) => ({
  width: 20, height: 20, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor",
  strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true, ...p,
});

export const LockIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>);
export const CheckIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>);
export const MenuIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 8h16M4 16h16" /></svg>);
export const CloseIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="m6 6 12 12M18 6 6 18" /></svg>);
export const ArrowIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M5 12h14m-5-5 5 5-5 5" /></svg>);
export const ClockIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>);
export const MailIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>);
export const PhoneIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M6 3h3l2 5-2 1.5a11 11 0 0 0 5.5 5.5L16 13l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 4 5a2 2 0 0 1 2-2Z" /></svg>);
export const PinIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>);
export const ChatIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M4 5h16v11H9l-5 4V5Z" /></svg>);
export const InstagramIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="4" y="4" width="16" height="16" rx="5" /><circle cx="12" cy="12" r="3.5" /><circle cx="16.8" cy="7.2" r=".6" /></svg>);
export const YoutubeIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><rect x="3" y="6" width="18" height="12" rx="4" /><path d="m10.5 9.5 4 2.5-4 2.5v-5Z" /></svg>);
export const FacebookIcon = (p: SVGProps<SVGSVGElement>) => (<svg {...base(p)}><path d="M14 8h2V5h-2.5A3.5 3.5 0 0 0 10 8.5V11H8v3h2v6h3v-6h2.2l.5-3H13V8.7c0-.4.3-.7 1-.7Z" /></svg>);
export const WhatsAppIcon = (p: SVGProps<SVGSVGElement>) => (
  <svg {...base(p)} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Decorative botanical line art. */
export function Botanical({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 120 200" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
      <path d="M60 195C58 140 62 80 60 8" />
      {[30, 60, 90, 120, 150].map((y, i) => (
        <g key={y}>
          <path d={`M60 ${y + 14}C${40 - i * 2} ${y + 6} ${28 - i * 2} ${y - 12} ${30 - i * 2} ${y - 26}C48 ${y - 22} 58 ${y - 6} 60 ${y + 14}Z`} />
          <path d={`M60 ${y + 4}C${80 + i * 2} ${y - 4} ${92 + i * 2} ${y - 22} ${90 + i * 2} ${y - 36}C72 ${y - 32} 62 ${y - 16} 60 ${y + 4}Z`} />
        </g>
      ))}
    </svg>
  );
}

/** Elegant Lotus Flower line art as seen in reference design */
export function LotusArt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {/* Center lotus petal */}
      <path d="M100 20 C110 50, 115 80, 100 130 C85 80, 90 50, 100 20 Z" fill="currentColor" fillOpacity="0.04" />
      {/* Inner left & right petals */}
      <path d="M100 130 C70 90, 60 55, 75 35 C90 60, 95 95, 100 130 Z" fill="currentColor" fillOpacity="0.03" />
      <path d="M100 130 C130 90, 140 55, 125 35 C110 60, 105 95, 100 130 Z" fill="currentColor" fillOpacity="0.03" />
      {/* Mid left & right petals */}
      <path d="M100 135 C50 100, 35 70, 52 50 C75 75, 88 105, 100 135 Z" fill="currentColor" fillOpacity="0.02" />
      <path d="M100 135 C150 100, 165 70, 148 50 C125 75, 112 105, 100 135 Z" fill="currentColor" fillOpacity="0.02" />
      {/* Outer base petals */}
      <path d="M100 140 C30 115, 15 90, 32 75 C60 90, 80 115, 100 140 Z" />
      <path d="M100 140 C170 115, 185 90, 168 75 C140 90, 120 115, 100 140 Z" />
      {/* Base stem and water lily leaf curve */}
      <path d="M100 140 Q100 170 98 190" strokeWidth="1.5" />
      <path d="M40 165 Q100 155 160 165" strokeDasharray="3 3" opacity="0.6" />
    </svg>
  );
}

/** Organic leaf branch line art */
export function LeafBranchArt({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 160 260" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" aria-hidden="true">
      <path d="M20 250 C40 180 80 110 140 20" strokeWidth="1.6" />
      <path d="M140 20 C110 30 90 50 100 70 C120 60 135 40 140 20 Z" fill="currentColor" fillOpacity="0.05" />
      <path d="M115 65 C85 70 70 90 85 110 C100 95 110 80 115 65 Z" fill="currentColor" fillOpacity="0.05" />
      <path d="M92 110 C60 120 45 140 60 160 C75 145 88 128 92 110 Z" fill="currentColor" fillOpacity="0.05" />
      <path d="M70 155 C40 165 25 185 40 205 C55 190 65 172 70 155 Z" fill="currentColor" fillOpacity="0.05" />
      {/* Alternate side leaves */}
      <path d="M125 45 C145 65 155 85 140 98 C130 80 122 60 125 45 Z" fill="currentColor" fillOpacity="0.05" />
      <path d="M102 90 C125 110 135 130 118 142 C110 125 100 105 102 90 Z" fill="currentColor" fillOpacity="0.05" />
      <path d="M80 135 C100 155 110 175 95 188 C85 170 78 150 80 135 Z" fill="currentColor" fillOpacity="0.05" />
    </svg>
  );
}

export function Wave({ className = "", fill = "#FFFCF7", flip = false }: { className?: string; fill?: string; flip?: boolean }) {
  return (
    <svg className={`block w-full ${flip ? "rotate-180" : ""} ${className}`} viewBox="0 0 1440 80" preserveAspectRatio="none" aria-hidden="true" height="60">
      <path d="M0 40C240 90 480 0 720 30s480 60 720 10V80H0Z" fill={fill} />
    </svg>
  );
}
