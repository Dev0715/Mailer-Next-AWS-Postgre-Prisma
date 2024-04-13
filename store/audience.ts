import { atom } from "jotai";

const customersAtom = atom([]);

const readOnlyAtom = atom((get) => get(customersAtom));

export { customersAtom };
