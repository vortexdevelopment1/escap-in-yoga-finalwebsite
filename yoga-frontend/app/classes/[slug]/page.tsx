import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ClassDetails from "@/components/classes/ClassDetails";
import { classes, getClass } from "@/data/classes";

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const c = getClass(params.slug);
  return { title: c ? c.name : "Class" };
}

export default function ClassPage({ params }: { params: { slug: string } }) {
  const item = getClass(params.slug);
  if (!item) notFound();
  return (
    <div className="pt-28 sm:pt-36">
      <ClassDetails item={item} />
    </div>
  );
}
