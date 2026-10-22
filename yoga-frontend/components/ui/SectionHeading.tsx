import type { ReactNode } from "react";

interface Props {
  title: string;
  eyebrow?: string;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "dark" | "light";
  as?: "h1" | "h2";
}

export default function SectionHeading({ title, eyebrow, description, align = "left", tone = "dark", as: Tag = "h2" }: Props) {
  const center = align === "center";
  const light = tone === "light";
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && <p className={`mb-3 text-sm font-semibold tracking-wide uppercase ${light ? "text-warmbeige" : "text-sage"}`}>{eyebrow}</p>}
      <Tag className={`text-4xl font-medium leading-[1.08] sm:text-5xl ${light ? "!text-white" : "text-forest"}`}>{title}</Tag>
      {description && <p className={`mt-5 text-lg leading-relaxed ${light ? "text-white/80" : "text-forest/80"}`}>{description}</p>}
    </div>
  );
}
