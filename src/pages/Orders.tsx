import { ReactElement, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";

type DataType = {
  _id: number;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const column: ColumnDef<DataType>[] = [
  {
    accessorKey: "_id",
    header: "ID",
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
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => row.original.status,
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: ({ row }) => row.original.action,
  },
];

const Orders = () => {
  const [rows] = useState<DataType[]>([
    {
      _id: 1234,
      amount: 3848,
      quantity: 25,
      discount: 3884,
      status: <span className="red">Processing</span>,
      action: <Link to={`/order/3458`}>View</Link>,
    },
  ]);

  const TableComponent = TableHOC<DataType>({
    columns: column,
    data: rows,
    containerClassName: "dashboard-product-box",
    showPagination: rows.length > 6,
  });
  return (
    <div className="container">
      <h1>My Orders</h1>
      <TableComponent />
    </div>
  );
};

export default Orders;
