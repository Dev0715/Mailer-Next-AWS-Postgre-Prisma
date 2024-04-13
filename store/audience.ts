import { atom } from "jotai";

const customersAtom = atom([]);

const readCutomerAtom = atom((get) => get(customersAtom));
const writeCustomerAtom = atom(null, (get, set, updateValue) => {
  set(customersAtom, (prev) => [...prev, updateValue]);
});
const readWriteCustomerAtom = atom(
  (get) => get(customersAtom),
  (get, set, updateValue) => {
    set(customersAtom, (prev) => [...prev, updateValue]);
  }
);

export { customersAtom };
