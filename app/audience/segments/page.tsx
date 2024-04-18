"use client";

import { getColumnsForSegmentsTable } from "../_components/segments-column";
import { Segment, SegmentAddition } from "@/shared/segment-type";
import { useEffect, useState, useTransition } from "react";
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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AddSement from "@/components/audience/add-segment";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createSegment } from "@/data/segment/create-segment";
import { v4 as uuidv4 } from "uuid";
import { QuestionAlert } from "@/components/utils/question-alert";
import { getAllSegmentsByEmail } from "@/data/segment/all-segments";
import { ConfirmAlert } from "@/components/utils/confirm-alert";
import { deleteSegment } from "@/data/segment/delete-segment";
import { deleteSegments } from "@/data/segment/delete-segments";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";

const Segments = () => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [segments, setSegments] = useState<Segment[]>([]);
  const [isAdding, setAdding] = useState<boolean>(false);
  const [isDeleting, setDeleting] = useState<boolean>(false);
  const [deletingSegment, setDeletingSegment] = useState<Segment>();
  const [isDeletingMulti, setDeletingMulti] = useState<boolean>(false);

  const [isConfirming, setConfirming] = useState<boolean>(false);
  const [confirmTitle, setConfirmTitle] = useState<string>("");
  const [confirmDescription, setConfirmDescription] = useState<string>("");

  useEffect(() => {
    getAllSegmentsByEmail(user?.email as string).then((segments: any) => {
      if (segments) {
        setSegments(segments);
      }
    });
  }, []);

  const isRowSelected = () => {
    return Object.keys(rowSelection).length > 0;
  };

  const setAddedConfirming = (success: boolean) => {
    setConfirming(true);
    if (success) {
      setConfirmTitle("Success");
      setConfirmDescription("New segment was added successfully");
    } else {
      setConfirmTitle("Failure");
      setConfirmDescription("An error occurred while adding new segment");
    }
  };

  const onNewSegmentAdded = ({
    title,
    description,
    filters
  }: SegmentAddition) => {
    setAdding(false);
    startTransition(() => {
      const newSegment = {
        userEmail: user?.email as string,
        segmentId: uuidv4(),
        title,
        description,
        filters,
        created: new Date().toISOString(),
        lastChanged: new Date().toISOString()
      };
      createSegment(newSegment)
        .then((res) => {
          if (res.success) {
            setSegments((prev) => [...prev, newSegment]);
            setAddedConfirming(true);
          } else {
            setAddedConfirming(false);
          }
        })
        .catch((error) => {
          setAddedConfirming(false);
        });
    });
  };

  const setDeleteConfirming = (success: boolean) => {
    setConfirming(true);
    if (success) {
      setConfirmTitle("Success");
      setConfirmDescription("1 segment was deleted successfully");
    } else {
      setConfirmTitle("Failure");
      setConfirmDescription("An error occured while deleting segment");
    }
  };

  const onSegmentDelete = (segment: Segment) => {
    setDeleting(true);
    setDeletingSegment(segment);
  };

  const onSegmentDeleted = () => {
    startTransition(() => {
      deleteSegment(user?.email as string, deletingSegment?.segmentId as string)
        .then((res) => {
          if (res.success) {
            // # Need to update to use splice function instead? #
            const newList = segments.filter(
              (item) => item.segmentId !== deletingSegment?.segmentId
            );
            setSegments(newList);
            setDeleteConfirming(true);
          } else {
            setDeleteConfirming(false);
          }
          table.toggleAllPageRowsSelected(false);
        })
        .catch((error) => {
          setDeleteConfirming(false);
          table.toggleAllPageRowsSelected(false);
        });
    });
  };

  const setSelectedRowsDeletedConfirming = (success: boolean) => {
    setConfirming(true);
    if (success) {
      setConfirmTitle("Success");
      setConfirmDescription("Selected segments were removed successfully");
    } else {
      setConfirmTitle("Failure");
      setConfirmDescription("An error occurred while removing segments");
    }
  };

  const onSelectedRowsDelete = () => {
    setDeletingMulti(true);
  };

  const onSelectedRowsDeleted = () => {
    const selectedSegmentIds = Object.keys(rowSelection).map(
      (index) => segments[Number(index)].segmentId
    );

    startTransition(() => {
      deleteSegments(user?.email as string, selectedSegmentIds)
        .then((res) => {
          if (res.success) {
            const newList = [...segments];
            Object.keys(rowSelection)
              .map((index) => Number(index))
              .reverse()
              .map((index) => {
                newList.splice(index, 1);
              });
            setSegments(newList);
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

    setConfirming(true);
    setConfirmTitle("Success");
    setConfirmDescription("Selected segments were removed successfully");
  };

  const onDeleteCancelled = (isOpen: boolean) => {
    setDeleting(isOpen);
    setDeletingMulti(isOpen);
  };

  const onSegmentDetails = (segment: Segment) => {
    console.log(segment);
  };

  const onSegmentEdit = (segment: Segment) => {};

  const columns = getColumnsForSegmentsTable({
    onSegmentDelete,
    onSegmentDetails,
    onSegmentEdit,
    isPending
  });
  const table = useReactTable({
    data: segments,
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
    <main className="w-5/6 flex flex-col py-6">
      {/** Delete 1 Customer */}
      <QuestionAlert
        open={isDeleting}
        title="Delete Customer"
        description={`Are you sure to delete ${deletingSegment?.title} from your mailing list?`}
        onAlertDialogClosed={onDeleteCancelled}
        onContinue={onSegmentDeleted}
      >
        <p>
          Are you sure to delete{" "}
          <span className="font-bold text-red-700">
            {deletingSegment?.title}
          </span>{" "}
          from your mailing list?
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

      <div className="w-full flex items-end justify-between pb-6">
        <p className="text-4xl text-green-700 font-semibold">All Segments</p>
        <Dialog
          open={isAdding}
          onOpenChange={(newStatus) => setAdding(newStatus)}
        >
          <DialogTrigger asChild>
            <Button
              disabled={isPending}
              variant="default"
              className="w-64 flex gap-x-4"
            >
              <FaPlus />
              Add Segment
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-full w-3/4">
            <AddSement onNewSegmentAdded={onNewSegmentAdded} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex items-center gap-x-4">
          <Input
            disabled={isPending}
            placeholder="Filter Title..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
          {isRowSelected() && (
            <Button
              variant={"outline"}
              className="border-red-700"
              onClick={onSelectedRowsDelete}
            >
              Delete selected mails
            </Button>
          )}
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
};

export default Segments;
