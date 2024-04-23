import { Customer } from "@/shared/customer-type";
import { atom } from "jotai";

type EmailTemplate = {
  design: any;
  html: string;
};

export const customersAtom = atom<Customer[]>([]);

export const emailAtom = atom<EmailTemplate>({
  design: {},
  html: ""
});
