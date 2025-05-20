import { ReactElement, useEffect, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  useAllUsersQuery,
  useDeleteUserMutation,
} from "../../redux/api/userAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Skeleton } from "../../components/Loader";
import { FaTrash } from "react-icons/fa";
import { responseToast } from "../../utils/features";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => row.original.avatar,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "gender",
    header: "Gender",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => row.original.action,
  },
];

const Customers = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const userId = user?._id;

  const { isLoading, data, isError, error } = useAllUsersQuery(userId!);

  const [rows, setRows] = useState<DataType[]>([]);

  const [deleteUser] = useDeleteUserMutation();

  const deleteHandler = async (userId: string) => {
    const res = await deleteUser({ userId, adminUserId: user!._id! });
    responseToast(res, null, "");
  };

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
      toast.error(err.data.message);
    }
  }, [isError, error]);

  useEffect(() => {
    if (data) {
      setRows(
        data.users.map((i) => ({
          avatar: (
            <img style={{ borderRadius: "50%" }} src={i.photo} alt={i.name} />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role,
          action: (
            <button onClick={() => deleteHandler(i._id)}>
              <FaTrash />
            </button>
          ),
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
    </div>
  );
};

export default Customers;
