import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

type Props = {
  open: boolean;
  emailList: string[];
  emailListTitle: string;
  onOpenChange: (open: boolean) => void;
};

export const EmailList = ({
  open,
  emailList,
  emailListTitle,
  onOpenChange
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-full w-5/6">
        <DialogHeader>
          <DialogTitle>{emailListTitle}</DialogTitle>
        </DialogHeader>
        <div className="w-full flex flex-wrap gap-4">
          {emailList.map((email) => (
            <p className="px-4 py-1 bg-gray-200 rounded-full">{email}</p>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
