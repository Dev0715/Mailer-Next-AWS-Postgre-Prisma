import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Segment } from "@/shared/segment-type";
import { FilterType } from "@/shared/filter-type";

type PropsType = {
  onSegmentDelete: (segment: Segment) => void;
  isPending: boolean;
};

export const getColumnsForSegmentsTable = ({
  onSegmentDelete,
  isPending
}: PropsType) => {
  const columns: ColumnDef<Segment>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          disabled={isPending}
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          disabled={isPending}
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "title",
      header: () => <div className="text-center">Title</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("title")}</div>
      )
    },
    {
      accessorKey: "description",
      header: () => <div className="text-center">Description</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("description")}
        </div>
      )
    },
    {
      accessorKey: "filters",
      header: () => <div className="text-center">Filters</div>,
      cell: ({ row }) => {
        const filters: FilterType[] = row.getValue("filters");
        return <div className="text-center font-medium">{filters.length}</div>;
      }
    },
    {
      accessorKey: "created",
      header: () => <div className="text-center">Created Date</div>,
      cell: ({ row }) => {
        const created = row.getValue("created");
        const cellValue = created
          ? new Date(created as string).toDateString()
          : "";
        return <div className="text-center font-medium">{cellValue}</div>;
      }
    },
    {
      accessorKey: "lastChanged",
      header: () => <div className="text-center">Last Changed</div>,
      cell: ({ row }) => {
        const lastChanged = row.getValue("lastChanged");
        const cellValue = lastChanged
          ? new Date(lastChanged as string).toDateString()
          : "";
        return <div className="text-center font-medium">{cellValue}</div>;
      }
    },
    {
      id: "actions",
      enableHiding: false,
      header: () => <div className="text-center">More Actions</div>,
      cell: ({ row }) => {
        const segment = row.original;
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                disabled={isPending}
                variant="ghost"
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Copy Segment Info</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onSegmentDelete(segment)}>
                Delete Segment
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Segment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return columns;
};
