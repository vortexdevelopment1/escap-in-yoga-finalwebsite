"use client";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Photo from "@/components/ui/Photo";
import { CheckIcon } from "@/components/ui/Icons";
import type { Posture } from "@/types";

export default function PostureModal({ posture, onClose }: { posture: Posture | null; onClose: () => void }) {
  return (
    <Modal open={!!posture} onClose={onClose} title={posture ? `${posture.name} details` : "Posture details"} maxWidth="max-w-3xl">
      {posture && (
        <div className="grid sm:grid-cols-2">
          <Photo src={posture.image} alt={`${posture.name} illustration`} className="aspect-square sm:aspect-auto sm:min-h-full" />
          <div className="p-7 sm:p-9">
            <p className="text-sm font-semibold text-terracotta-dark">{posture.category} · {posture.level}</p>
            <h2 className="mt-2 text-3xl">{posture.name}</h2>
            <p className="text-sm italic text-brown/60">{posture.sanskrit}</p>
            <p className="mt-4 text-brown/85">{posture.description}</p>
            <h3 className="mt-6 text-lg">Wellness benefits</h3>
            <ul className="mt-3 space-y-2">
              {posture.benefits.map((b) => <li key={b} className="flex items-start gap-2"><CheckIcon className="mt-0.5 shrink-0 text-terracotta-dark" width={18} height={18} />{b}</li>)}
            </ul>
            <p className="mt-5 text-sm text-brown/60">Move within your comfort. Speak to a health professional if you have concerns.</p>
            <div className="mt-6"><Button href="/classes/hot-yoga">Try it in Hot Yoga</Button></div>
          </div>
        </div>
      )}
    </Modal>
  );
}
