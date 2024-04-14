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

type PropsType = {
  onCustomerDelete: (customer: Customer) => void;
  onCustomerEdit: (customer: Customer) => void;
};

export const getColumnsForContactsTable = ({
  onCustomerDelete,
  onCustomerEdit
}: PropsType) => {
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
      accessorKey: "customerEmail",
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
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("customerEmail")}</div>
      )
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
      accessorKey: "lastName",
      header: () => <div className="text-center">Last Name</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("lastName")}
        </div>
      )
    },
    {
      accessorKey: "address",
      header: () => <div className="text-center">Address</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">{row.getValue("address")}</div>
      )
    },
    {
      accessorKey: "phoneNumber",
      header: () => <div className="text-center">Phone</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("phoneNumber")}
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
      accessorKey: "tags",
      header: () => <div className="text-center">Tags</div>,
      cell: ({ row }) => {
        const tags: string[] = row.getValue("tags");
        return (
          <div className="flex justify-center">
            <div className="font-medium flex flex-wrap gap-1">
              {tags.map((tag) => (
                <Badge className="cursor-pointer" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        );
      },
      // Customized Filter Function
      filterFn: (row, id, filterValue) => {
        const tags: string[] = row.getValue("tags");
        if (tags.find((tag) => tag.toLowerCase().includes(filterValue)))
          return true;
        else return false;
      }
    },
    {
      accessorKey: "subscribed",
      header: () => <div className="text-center">Subscribed</div>,
      cell: ({ row }) => {
        const subscribed: boolean = row.getValue("subscribed");
        return (
          <div className="flex justify-center">
            <Badge
              className={`font-medium cursor-pointer ${subscribed ? "bg-green-700" : "bg-red-700 hover:bg-red-600"}`}
            >
              {subscribed ? "Subscribed" : "Unsubscribed"}
            </Badge>
          </div>
        );
      }
    },
    {
      accessorKey: "contactRating",
      header: () => <div className="text-center">Contact Rating</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium">
          {row.getValue("contactRating")}
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
