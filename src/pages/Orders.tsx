import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useMyOrdersQuery } from "../redux/api/orderAPI";
import toast from "react-hot-toast";
import { CustomError } from "../types/api-types";
import { Skeleton } from "../components/Loader";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: ColumnDef<DataType>[] = [
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
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id ?? "";

  const skip = !userId;
  const { isLoading, data, isError, error } = useMyOrdersQuery(userId, {
    skip,
  });

  const [rows, setRows] = useState<DataType[]>([]);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          discount: i.discount,
          quantity: i.orderItems.length,
          status: (
            <span
              className={
                i.status === "processing"
                  ? "red"
                  : i.status === "shipped"
                  ? "green"
                  : "purple"
              }
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>({
    columns,
    data: rows,
    showPagination: rows.length > 6,
  });
  return (
    <div className="container">
      <h1>My Orders</h1>
      {isLoading ? <Skeleton length={20} /> : <Table />}
    </div>
  );
};

export default Orders;
