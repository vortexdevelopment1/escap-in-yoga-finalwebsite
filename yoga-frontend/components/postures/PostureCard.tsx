import Photo from "@/components/ui/Photo";
import type { Posture } from "@/types";

export default function PostureCard({ item, onOpen }: { item: Posture; onOpen: (p: Posture) => void }) {
  return (
    <button onClick={() => onOpen(item)} className="group block h-full w-full overflow-hidden rounded-[2rem] bg-white text-left shadow-[0_18px_40px_-30px_rgba(52,76,61,.2)] transition duration-300 hover:-translate-y-1.5">
      <Photo src={item.image} alt={`${item.name} illustration`} className="aspect-square" zoom />
      <div className="p-6">
        <p className="text-sm font-semibold text-sage">{item.category} · {item.level}</p>
        <h3 className="mt-2 text-2xl font-serif text-forest">{item.name}</h3>
        <p className="text-sm italic text-forest/60">{item.sanskrit}</p>
        <p className="mt-3 line-clamp-2 text-forest/80">{item.description}</p>
        <ul className="mt-4 space-y-1.5 text-sm">
          {item.benefits.slice(0, 2).map((b) => <li key={b} className="flex gap-2 text-forest/80"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sage" aria-hidden="true" />{b}</li>)}
        </ul>
        <p className="mt-5 text-sm font-semibold text-sage">View details</p>
      </div>
    </button>
  );
}
