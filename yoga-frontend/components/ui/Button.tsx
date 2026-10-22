import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "light";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary: "bg-sage text-white hover:bg-sage-dark enabled:hover:-translate-y-0.5 shadow-[0_8px_20px_-8px_rgba(135,155,128,.6)]",
  secondary: "border border-forest/40 text-forest hover:bg-forest hover:text-white",
  ghost: "text-forest hover:bg-warmbeige/60",
  light: "bg-white text-forest hover:bg-warmbeige",
};
const sizes: Record<Size, string> = {
  sm: "min-h-[40px] px-4 py-2 text-sm",
  md: "min-h-[46px] px-6 py-3 text-base",
  lg: "min-h-[54px] px-8 py-4 text-base",
};

interface Props extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  variant?: Variant;
  size?: Size;
  className?: string;
  href?: string;
  children: ReactNode;
}

export default function Button({ variant = "primary", size = "md", className = "", href, children, ...rest }: Props) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button className={cls} {...rest}>{children}</button>;
}
