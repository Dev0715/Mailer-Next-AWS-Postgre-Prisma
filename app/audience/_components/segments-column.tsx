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
import { Badge } from "@/components/ui/badge";
import { Customer } from "@/shared/customer-type";

type PropsType = {};

export const getColumnsForContactsTable = ({}: PropsType) => {
  const columns: ColumnDef<Customer>[] = [
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
      accessorKey: "firstName",
      header: () => <div className="text-center">First Name</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("firstName")}
        </div>
      )
    },
    {
      accessorKey: "birthday",
      header: () => <div className="text-center">Birthday</div>,
      cell: ({ row }) => {
        const birthday = row.getValue("birthday");
        const cellValue = birthday
          ? new Date(birthday as string).toDateString()
          : "";
        return <div className="text-center font-medium">{cellValue}</div>;
      }
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
                onClick={() =>
                  navigator.clipboard.writeText(customer.customerEmail)
                }
              >
                Copy Customer Email
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onCustomerDelete(customer)}>
                Delete Customer
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onCustomerEdit(customer)}>
                Edit Customer
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      }
    }
  ];

  return columns;
};
