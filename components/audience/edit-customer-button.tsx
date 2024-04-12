import React from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import NewSubscriber from "@/app/audience/contacts/new-subscriber/page";

export const EditCustomerButton = ({
  children
}: {
  children: React.ReactNode;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <NewSubscriber />
      </DialogContent>
    </Dialog>
  );
};
