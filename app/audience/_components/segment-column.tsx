import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Subscriber } from "@/shared/types/subscriber";

export const getColumnsForContactsTable = () => {
  const columns: ColumnDef<Subscriber>[] = [
    {
      accessorKey: "subscriberEmail",
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
        <div className="pl-4 lowercase">{row.getValue("subscriberEmail")}</div>
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
            <div className="font-medium flex flex-wrap justify-center gap-1">
              {tags?.map((tag) => (
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
    }
  ];

  return columns;
};
