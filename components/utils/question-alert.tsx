import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";

type PropsParams = {
  open: boolean;
  title: string;
  description: string;
  onAlertDialogClosed: (open: boolean) => void;
  onContinue: () => void;
};

export const QuestionAlert = ({
  open,
  title,
  description,
  onAlertDialogClosed,
  onContinue
}: PropsParams) => {
  return (
    <AlertDialog open={open} onOpenChange={onAlertDialogClosed}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="w-24">Cancel</AlertDialogCancel>
          <AlertDialogAction className="w-24" onClick={onContinue}>
            OK
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
