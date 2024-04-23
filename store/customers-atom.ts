import { Customer } from "@/shared/customer-type";
import { atom } from "jotai";

export const customersAtom = atom<Customer[]>([]);
