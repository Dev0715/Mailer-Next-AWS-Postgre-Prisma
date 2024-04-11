import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
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
          {/* <AlertDialogCancel>Cancel</AlertDialogCancel> */}
          <AlertDialogAction className="w-24">OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
