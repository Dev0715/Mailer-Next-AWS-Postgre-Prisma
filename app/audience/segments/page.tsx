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

const Segments = () => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const columns = getColumnsForSegmentsTable({});
  const [segments, setSegments] = useState<Segment[]>([]);

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
      <div className="w-full flex items-end justify-between pb-6">
        <p className="text-4xl text-green-700 font-semibold">All Segments</p>
        <Button variant="default" asChild className="w-64 flex gap-x-4">
          <Link href="/audience/segments/add">
            <FaPlus />
            Add Segment
          </Link>
        </Button>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-xl text-gray-500">April, 2024 (2)</p>
      </div>
    </main>
  );
};

export default Segments;
