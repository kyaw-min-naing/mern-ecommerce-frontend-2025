import { ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useAllProductQuery } from "../../redux/api/productAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { RootState } from "../../redux/store";
import { Skeleton } from "../../components/Loader";
import TableHOC from "../../components/admin/TableHOC";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  {
    header: "Photo",
    accessorKey: "photo",
    cell: (info) => info.getValue(),
  },
  {
    header: "Name",
    accessorKey: "name",
  },
  {
    header: "Price",
    accessorKey: "price",
  },
  {
    header: "Stock",
    accessorKey: "stock",
  },
  {
    header: "Action",
    accessorKey: "action",
    cell: (info) => info.getValue(),
  },
];

const Products = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  console.log("user", user);

  const userId = user?._id;

  const { isLoading, isError, error, data } = useAllProductQuery(userId!);

  const [rows, setRows] = useState<DataType[]>([]);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.products.map((i) => ({
          photo: <img src={i.photos?.[0]?.url} />,
          name: i.name,
          price: i.price,
          stock: i.stock,
          action: <Link to={`/admin/product/${i._id}`}>Manage</Link>,
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
      <main>{isLoading ? <Skeleton length={20} /> : <Table />}</main>
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
