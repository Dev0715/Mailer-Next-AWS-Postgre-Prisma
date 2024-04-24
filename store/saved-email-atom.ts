import { atom } from "jotai";

type SavedEmail = {
  isSaved: boolean;
  email: {
    design: any;
    html: string;
  };
};

export const savedEmailContentAtom = atom<SavedEmail>({
  isSaved: false,
  email: {
    design: {},
    html: ""
  }
});
