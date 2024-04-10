"use client";

import * as React from "react";
import {
  ColumnDef,
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

export type Customer = {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  phone: string;
  birthday: string;
  tags: string[];
  subscribed: boolean;
  contactRating: number;
  created: string;
  lastChanged: string;
};

const data: Customer[] = [
  {
    email: "ken99@yahoo.com",
    firstName: "success",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1", "Customer2"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  },
  {
    email: "ken99@yahoo.com",
    firstName: "success",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1", "Customer3"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  },
  {
    email: "ken99@yahoo.com",
    firstName: "success",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  },
  {
    email: "ken99@yahoo.com",
    firstName: "success",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  },
  {
    email: "Abe45@gmail.com",
    firstName: "success",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  },
  {
    email: "Monserrat44@gmail.com",
    firstName: "processing",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  },
  {
    email: "Silas22@gmail.com",
    firstName: "success",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  },
  {
    email: "carmella@hotmail.com",
    firstName: "failed",
    lastName: "Last",
    address: "address1 address2 address3",
    phone: "1215646785",
    birthday: "07/05/1994",
    tags: ["Customer1"],
    subscribed: true,
    contactRating: 2,
    created: "06/05/2024",
    lastChanged: "06/05/2024"
  }
];

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
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
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>
  },
  {
    accessorKey: "firstName",
    header: () => <div className="text-right">First Name</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("firstName")}</div>
    )
  },
  {
    accessorKey: "lastName",
    header: () => <div className="text-right">Last Name</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("lastName")}</div>
    )
  },
  {
    accessorKey: "address",
    header: () => <div className="text-right">Address</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("address")}</div>
    )
  },
  {
    accessorKey: "phone",
    header: () => <div className="text-right">Phone</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("phone")}</div>
    )
  },
  {
    accessorKey: "birthday",
    header: () => <div className="text-right">Birthday</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("birthday")}</div>
    )
  },
  {
    accessorKey: "tags",
    header: () => <div className="text-right">Tags</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getUniqueValues("tags").map((item: string) => (
          <p>{item}</p>
        ))}
      </div>
    )
  },
  {
    accessorKey: "subscribed",
    header: () => <div className="text-right">Subscribed</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("subscribed") ? "Subscribed" : null}
      </div>
    )
  },
  {
    accessorKey: "contactRating",
    header: () => <div className="text-right">Contact Rating</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("contactRating")}
      </div>
    )
  },
  {
    accessorKey: "created",
    header: () => <div className="text-right">Created Date</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">{row.getValue("created")}</div>
    )
  },
  {
    accessorKey: "lastChanged",
    header: () => <div className="text-right">Last Changed</div>,
    cell: ({ row }) => (
      <div className="text-right font-medium">
        {row.getValue("lastChanged")}
      </div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(customer.email)}
            >
              Copy Customer Email
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View customer details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];

export default function Contacts() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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
      <div className="w-full flex items-end justify-between pb-6">
        <p className="text-5xl text-green-700 font-semibold">All Contacts</p>
        <Button variant="default" asChild className="w-64 flex gap-x-4">
          <Link href="/audience/contacts/add">
            <FaPlus />
            Add Contact
          </Link>
        </Button>
      </div>
      <div className="w-full flex flex-col gap-y-4">
        <div className="flex items-center">
          <Input
            placeholder="Filter emails..."
            value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("email")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
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
}
