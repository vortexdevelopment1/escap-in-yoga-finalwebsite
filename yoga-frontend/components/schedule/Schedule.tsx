"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";
import { classes } from "@/data/classes";
import { batchesForDay, scheduleDayOrder } from "@/data/schedule";
import { WEEKDAYS } from "@/lib/dates";
import ScheduleCard from "./ScheduleCard";

export default function Schedule() {
  const [day, setDay] = useState(1);
  const [classSlug, setClassSlug] = useState("all");

  useEffect(() => setDay(new Date().getDay()), []);

  const sessions = batchesForDay(day).filter((b) => classSlug === "all" || b.classSlug === classSlug);

  return (
    <div>
      <div role="group" aria-label="Choose a day" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-3 sm:mx-0 sm:flex-wrap sm:px-0">
        {scheduleDayOrder.map((d) => (
          <button key={d} onClick={() => setDay(d)} aria-pressed={day === d}
            className={`min-h-[46px] shrink-0 rounded-full border px-5 font-semibold transition ${day === d ? "border-brown bg-brown text-cream" : "border-brown/25 hover:bg-peach/60"}`}>
            <span className="sm:hidden">{WEEKDAYS[d].slice(0, 3)}</span><span className="hidden sm:inline">{WEEKDAYS[d]}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 max-w-xs">
        <label htmlFor="class-filter" className="mb-2 block text-sm font-semibold">Class</label>
        <select id="class-filter" value={classSlug} onChange={(e) => setClassSlug(e.target.value)}
          className="w-full rounded-2xl border border-brown/20 bg-cream px-4 py-3 focus:border-terracotta focus:outline-none focus:ring-2 focus:ring-terracotta/30">
          <option value="all">All classes</option>
          {classes.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <h3 className="mt-10 font-serif text-3xl" aria-live="polite">{WEEKDAYS[day]}</h3>
      <div className="mt-5">
        {sessions.length ? (
          <ul className="space-y-4">{sessions.map((b) => <ScheduleCard key={b.id} batch={b} />)}</ul>
        ) : (
          <EmptyState title="No sessions match" action={<Button variant="secondary" onClick={() => setClassSlug("all")}>Show all classes</Button>}>
            There are no sessions for this class on {WEEKDAYS[day]}. Try another day or class.
          </EmptyState>
        )}
      </div>
      <p className="mt-6 text-sm text-brown/60">Demo timings. Replace with the real batch schedule.</p>
    </div>
  );
}
