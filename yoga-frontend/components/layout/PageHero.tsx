import type { ReactNode } from "react";
import SectionHeading from "@/components/ui/SectionHeading";

export default function PageHero({ title, eyebrow, description }: { title: string; eyebrow?: string; description?: ReactNode }) {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-14 pt-32 sm:px-8 sm:pt-40">
      <SectionHeading as="h1" title={title} eyebrow={eyebrow} description={description} />
    </div>
  );
}
