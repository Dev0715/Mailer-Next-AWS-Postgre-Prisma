import { atom } from "jotai";

type SavedEmailContent = {
  isSaved: boolean;
  emailContent: {
    design: any;
    html: string;
  };
};

export const savedEmailContentAtom = atom<SavedEmailContent>({
  isSaved: false,
  emailContent: {
    design: {},
    html: ""
  }
});
