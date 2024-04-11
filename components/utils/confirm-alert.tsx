import {
  AlertDialog,
  AlertDialogAction,
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
};

export const ConfirmAlert = ({
  open,
  title,
  description,
  onAlertDialogClosed
}: PropsParams) => {
  return (
    <AlertDialog open={open} onOpenChange={onAlertDialogClosed}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction className="w-24">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
