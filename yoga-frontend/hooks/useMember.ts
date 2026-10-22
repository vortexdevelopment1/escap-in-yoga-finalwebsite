"use client";
import { useEffect, useState } from "react";
import type { MemberProfile } from "@/types";
import { buildProfile } from "@/lib/member";
import { getBooking, getSession, subscribe } from "@/lib/storage";

/** Reads the mock member session from localStorage. `ready` is false until the first client read. */
export function useMember() {
  const [state, setState] = useState<{ ready: boolean; profile: MemberProfile | null }>({ ready: false, profile: null });
  useEffect(() => {
    const load = () => setState({ ready: true, profile: buildProfile(getSession(), getBooking()) });
    load();
    return subscribe(load);
  }, []);
  return state;
}
