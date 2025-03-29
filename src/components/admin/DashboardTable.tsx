import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "./TableHOC";

interface DataType {
  _id: string;
  quantity: number;
  discount: number;
  amount: number;
  status: string;
}

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "_id",
    header: "Id",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

interface DashboardTableProps {
  data: DataType[];
}

const DashboardTable: React.FC<DashboardTableProps> = ({ data }) => {
  const TableComponent = TableHOC<DataType>({
    columns,
    data,
    containerClassName: "transaction-box",
    showPagination: false,
  });
  return <TableComponent />;
};

export default DashboardTable;
