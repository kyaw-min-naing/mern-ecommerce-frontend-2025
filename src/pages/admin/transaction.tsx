import { ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";

type DataType = {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
};

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "user",
    header: "User",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "discount",
    header: "Discount",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
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

const Transaction = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id;

  const { isLoading, data, isError, error } = useAllOrdersQuery(userId!);

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
          user: i.user.name,
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
    <div className="admin-container">
      <AdminSidebar />
      <main> {isLoading ? <Skeleton length={20} /> : <Table />}</main>
    </div>
  );
};

export default Transaction;
