"use client";

import { useState, useEffect, useTransition } from "react";
import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import { Subscriber } from "@/shared/types/subscriber";
import { getAllSubscribersByEmail } from "@/data/audience/subscribers-all";
import { getColumnsForContactsTable } from "../_components/contacts-column";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { EditCustomer } from "@/components/audience/edit-customer";
import { useAtom } from "jotai";
import { subscriberAtom } from "@/store/customers-atom";
import { QuestionAlert } from "@/components/utils/question-alert";
import { useCurrentUser } from "@/hooks/use-current-user";
import { deleteSubscriber } from "@/data/audience/subscriber-delete";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { deleteSubscribers } from "@/data/audience/subscribers-delete";
import { Spinner } from "@nextui-org/spinner";

export default function Contacts() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [subscribers, setSubscribers] = useAtom(subscriberAtom);
  const [isEditing, setEditing] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<Subscriber>();
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [deletingEmail, setDeletingEmail] = useState<string>("");
  const [isDeletingMulti, setDeletingMulti] = useState<boolean>(false);

  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmDescription, setConfirmDescription] = useState<string>("");

  useEffect(() => {
    if (subscribers.length > 0) return;
    getAllSubscribersByEmail(user?.email as string).then((_subscribers) => {
      if (!_subscribers) return;
      setSubscribers(
        _subscribers.map((subscriber) => subscriber as Subscriber)
      );
    });
  }, []);

  const onSubscriberEdit = (_subscriber: Subscriber) => {
    setEditingCustomer(_subscriber);
    setEditing(true);
  };

  const onCustomerEdited = (success: boolean, updatedCustomer?: Subscriber) => {
    if (success) {
      const newCustomers = subscribers.map((customer) =>
        customer.subscriberEmail === updatedCustomer?.subscriberEmail
          ? updatedCustomer
          : customer
      );
      setSubscribers(newCustomers);
    }
    setEditing(false);
  };

  const setDeletedConfirming = (success: boolean) => {
    setConfirming(true);
    if (success) {
      setConfirmTitle("Success");
      setConfirmDescription("1 customer was removed successfully");
    } else {
      setConfirmTitle("Failed");
      setConfirmDescription("An error occurred while removing customer");
    }
  };

  const onCustomerDelete = (customer: Subscriber) => {
    setDeletingEmail(customer.subscriberEmail);
    setDeleting(true);
  };

  const onCustomerDeleted = () => {
    startTransition(() => {
      deleteSubscriber(user?.email as string, deletingEmail)
        .then((res) => {
          if (res.success) {
            // # Need to update to use splice function instead? #
            const newList = subscribers.filter(
              (item) => item.subscriberEmail !== deletingEmail
            );
            setSubscribers(newList);
            setDeletedConfirming(true);
          } else {
            setDeletedConfirming(false);
          }
          table.toggleAllPageRowsSelected(false);
        })
        .catch((error) => {
          setDeletedConfirming(false);
          table.toggleAllPageRowsSelected(false);
        });
    });
  };

  const onDeleteCancelled = (isOpen: boolean) => {
    setDeleting(isOpen);
    setDeletingMulti(isOpen);
  };

  const isRowSelected = () => {
    return Object.keys(rowSelection).length > 0;
  };

  const setSelectedRowsDeletedConfirming = (success: boolean) => {
    setConfirming(true);
    if (success) {
      setConfirmTitle("Success");
      setConfirmDescription("Selected emails were removed successfully");
    } else {
      setConfirmTitle("Failure");
      setConfirmDescription("An error occurred while removing emails");
    }
  };

  const onSelectedRowsDelete = () => {
    setDeletingMulti(true);
  };

  const onSelectedRowsDeleted = () => {
    const selectedEmails = Object.keys(rowSelection).map(
      (index) => subscribers[Number(index)].subscriberEmail
    );

    startTransition(() => {
      deleteSubscribers(user?.email as string, selectedEmails)
        .then((res) => {
          if (res.success) {
            const newList = [...subscribers];
            Object.keys(rowSelection)
              .map((index) => Number(index))
              .reverse()
              .map((index) => {
                newList.splice(index, 1);
              });
            setSubscribers(newList);
            setSelectedRowsDeletedConfirming(true);
          } else {
            setSelectedRowsDeletedConfirming(false);
          }
          table.toggleAllPageRowsSelected(false);
        })
        .catch((error) => {
          setSelectedRowsDeletedConfirming(false);
          table.toggleAllPageRowsSelected(false);
        });
    });
  };

  const columns = getColumnsForContactsTable({
    onCustomerDelete,
    onCustomerEdit: onSubscriberEdit,
    isPending
  });
  const table = useReactTable({
    data: subscribers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <main className="w-full flex flex-col py-6">
      {/** Edit Customer Dialog */}
      <Dialog open={isEditing} onOpenChange={(isOpen) => setEditing(isOpen)}>
        <DialogContent className="max-w-full w-1/2">
          <EditCustomer
            customer={editingCustomer}
            onCustomerUpdate={onCustomerEdited}
          />
        </DialogContent>
      </Dialog>

      {/** Delete 1 Customer */}
      <QuestionAlert
        open={isDeleting}
        title="Delete Customer"
        description={`Are you sure to delete ${deletingEmail} from your mailing list?`}
        onAlertDialogClosed={onDeleteCancelled}
        onContinue={onCustomerDeleted}
      >
        <p>
          Are you sure to delete{" "}
          <span className="font-bold text-red-700">{deletingEmail}</span> from
          your mailing list?
        </p>
      </QuestionAlert>

      {/** Delete Selected Customers */}
      <QuestionAlert
        open={isDeletingMulti}
        title="Delete Customers"
        description="Are you sure to delete selected emails from your mailing list?"
        onAlertDialogClosed={onDeleteCancelled}
        onContinue={onSelectedRowsDeleted}
      />

      {/** Confirm Alert */}
      <ConfirmAlert
        open={isConfirming}
        title={confirmTitle}
        description={confirmDescription}
        onAlertDialogClosed={() => setConfirming(false)}
      />

      {/** Main Page */}
      <div className="w-full flex items-end justify-between pb-6">
        <p className="text-4xl text-green-700 font-semibold">All Contacts</p>
        <Button variant="default" asChild className="w-64 flex gap-x-4">
          <Link href="/audience/contacts/add">
            <FaPlus />
            Add Contact
          </Link>
        </Button>
      </div>
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <Input
            disabled={isPending}
            placeholder="Filter emails..."
            value={
              (table
                .getColumn("subscriberEmail")
                ?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table
                .getColumn("subscriberEmail")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
          <Input
            disabled={isPending}
            placeholder="Filter Tags..."
            value={(table.getColumn("tags")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("tags")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
          <div className="flex items-center gap-x-6">
            {isRowSelected() && (
              <Button
                disabled={isPending}
                variant={"outline"}
                className="border-red-700"
                onClick={onSelectedRowsDelete}
              >
                Delete selected mails
              </Button>
            )}
            {isPending && <Spinner color="danger" />}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
