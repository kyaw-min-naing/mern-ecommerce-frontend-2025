import { ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { Skeleton } from "../../components/Loader";
import { Link } from "react-router-dom";
import TableHOC from "../../components/admin/TableHOC";
import { ColumnDef } from "@tanstack/react-table";
import { AllDisCountsResponse } from "../../types/api-types";
import { useFetchData } from "6pp";
import { RootState, server } from "../../redux/store";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { FaPlus } from "react-icons/fa";

interface DataType {
  code: string;
  amount: number;
  _id: string;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  {
    header: "Id",
    accessorKey: "_id",
  },
  {
    header: "Code",
    accessorKey: "code",
  },
  {
    header: "Amount",
    accessorKey: "amount",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: (info) => info.getValue(),
  },
];

const Discount = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id;

  const {
    data,
    loading: isLoading,
    error,
  } = useFetchData<AllDisCountsResponse>({
    url: userId ? `${server}/api/v1/payment/coupon/all?id=${userId}` : "",
    dependencyProps: userId ? [userId] : [],
  });

  console.log("Discount data:", data);

  const [rows, setRows] = useState<DataType[]>([]);

  const Table = TableHOC<DataType>({
    columns,
    data: rows,
    showPagination: rows.length > 6,
  });

  if (error) toast.error(error);

  useEffect(() => {
    if (data) {
      setRows(
        data.coupons.map((i) => ({
          _id: i._id,
          code: i.code,
          amount: i.amount,
          action: <Link to={`/admin/discount/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Skeleton length={20} /> : <Table />}</main>
      <Link to="/admin/discount/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Discount;
