import { Subscriber } from "@/shared/types/subscriber";
import { atom } from "jotai";

export const subscriberAtom = atom<Subscriber[]>([]);
