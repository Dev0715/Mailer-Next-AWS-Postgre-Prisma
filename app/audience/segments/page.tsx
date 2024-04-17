"use client";

import CampaignItem from "@/app/campaign/_components/campaign-item";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { getColumnsForSegmentsTable } from "../_components/segments-column";
import { Segment } from "@/shared/segment-type";
import { useState } from "react";
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
import { FilterType } from "@/shared/filter-type";
import { useCurrentUser } from "@/hooks/use-current-user";
import { createSegment } from "@/data/segment/create-segment";
import { v4 as uuidv4 } from "uuid";

const Segments = () => {
  const user = useCurrentUser();

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const [segments, setSegments] = useState<Segment[]>([
    {
      ownerEmail: "",
      segmentId: "",
      title: "Segment 1",
      description: "Segment 1",
      filters: [],
      created: "2021-09-01",
      lastChanged: ""
    },
    {
      ownerEmail: "",
      segmentId: "",
      title: "Segment 1",
      description: "Segment 1",
      filters: [],
      created: "2021-09-01",
      lastChanged: ""
    },
    {
      ownerEmail: "",
      segmentId: "",
      title: "Segment 1",
      description: "Segment 1",
      filters: [],
      created: "2021-09-01",
      lastChanged: ""
    }
  ]);

  const columns = getColumnsForSegmentsTable({});

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

  const onNewSegmentAdded = ({
    title,
    description,
    filters
  }: {
    title: string;
    description: string;
    filters: FilterType[];
  }) => {
    setDialogOpen(false);
    createSegment({
      ownerEmail: user?.email as string,
      segmentId: uuidv4(),
      title,
      description,
      filters,
      created: new Date().toISOString(),
      lastChanged: new Date().toISOString()
    })
      .then((res) => {
        if (res.success) {
        }
      })
      .catch((res) => {});
  };

  return (
    <main className="w-5/6 flex flex-col py-6">
      <div className="w-full flex items-end justify-between pb-6">
        <p className="text-4xl text-green-700 font-semibold">All Segments</p>
        <Dialog
          open={dialogOpen}
          onOpenChange={(newStatus) => setDialogOpen(newStatus)}
        >
          <DialogTrigger asChild>
            <Button variant="default" className="w-64 flex gap-x-4">
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
            placeholder="Filter emails..."
            value={
              (table.getColumn("customerEmail")?.getFilterValue() as string) ??
              ""
            }
            onChange={(event) =>
              table
                .getColumn("customerEmail")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
          <Input
            placeholder="Filter Tags..."
            value={(table.getColumn("tags")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("tags")?.setFilterValue(event.target.value)
            }
            className="max-w-xs"
          />
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
