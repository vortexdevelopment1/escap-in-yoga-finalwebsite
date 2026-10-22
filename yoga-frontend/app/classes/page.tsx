import type { Metadata } from "next";
import ClassGrid from "@/components/classes/ClassGrid";
import PageHero from "@/components/layout/PageHero";
import { classes } from "@/data/classes";

export const metadata: Metadata = { title: "Our Services" };

export default function ClassesPage() {
  return (
    <>
      <PageHero title="Our Services" eyebrow="Classes" description="Six ways to practise, from slow and grounding to warm and energising. Open a class to see its sessions." />
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8"><ClassGrid items={classes} /></div>
    </>
  );
}
