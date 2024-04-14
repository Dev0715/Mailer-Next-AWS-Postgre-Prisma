import { Customer } from "@/shared/customer-type";
import { atom, createStore } from "jotai";

export const customersAtom = atom<Customer[]>([]);

// const readCutomerAtom = atom((get) => get(customersAtom));
// const writeCustomerAtom = atom(null, (get, set, updateData: Customer) => {
//   set(customersAtom, (prev) => [...prev, updateData]);
// });
// const readWriteCustomerAtom = atom(
//   (get) => get(customersAtom),
//   (get, set, updateData: Customer) => {
//     set(customersAtom, (prev) => [...prev, updateData]);
//   }
// );

// const myStore = createStore();
// myStore.set(customersAtom, []);
