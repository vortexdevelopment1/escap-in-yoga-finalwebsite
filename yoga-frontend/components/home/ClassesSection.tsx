import SectionHeading from "@/components/ui/SectionHeading";
import ClassGrid from "@/components/classes/ClassGrid";
import { classes } from "@/data/classes";

export default function ClassesSection() {
  return (
    <section id="classes" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Our Services"
          title="Find the class that fits your day"
        />
        <div className="mt-14">
          <ClassGrid items={classes} />
        </div>
      </div>
    </section>
  );
}
