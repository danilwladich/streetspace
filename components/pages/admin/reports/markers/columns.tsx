"use client";

import { ColumnDef } from "@tanstack/react-table";

interface ReportType {
  id: number;
  type: string;
  message: string;
  updatedAt: string;
}

export const columns: ColumnDef<ReportType>[] = [
  {
    accessorKey: "type",
    header: "type",
  },
  {
    accessorKey: "message",
    header: "message",
  },
  {
    accessorKey: "updatedAt",
    header: "reportedAt",
  },
];
