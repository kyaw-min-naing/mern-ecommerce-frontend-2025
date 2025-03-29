// import { ReactElement, useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import { Column } from "react-table";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import TableHOC from "../../components/admin/TableHOC";

// interface DataType {
//   avatar: ReactElement;
//   name: string;
//   email: string;
//   gender: string;
//   role: string;
//   action: ReactElement;
// }

// const columns: Column<DataType>[] = [
//   {
//     Header: "Avatar",
//     accessor: "avatar",
//   },
//   {
//     Header: "Name",
//     accessor: "name",
//   },
//   {
//     Header: "Gender",
//     accessor: "gender",
//   },
//   {
//     Header: "Email",
//     accessor: "email",
//   },
//   {
//     Header: "Role",
//     accessor: "role",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//   },
// ];

// const img = "https://randomuser.me/api/portraits/women/54.jpg";
// const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

// const arr: Array<DataType> = [
//   {
//     avatar: (
//       <img
//         style={{
//           borderRadius: "50%",
//         }}
//         src={img}
//         alt="Shoes"
//       />
//     ),
//     name: "Emily Palmer",
//     email: "emily.palmer@example.com",
//     gender: "female",
//     role: "user",
//     action: (
//       <button>
//         <FaTrash />
//       </button>
//     ),
//   },

//   {
//     avatar: (
//       <img
//         style={{
//           borderRadius: "50%",
//         }}
//         src={img2}
//         alt="Shoes"
//       />
//     ),
//     name: "May Scoot",
//     email: "aunt.may@example.com",
//     gender: "female",
//     role: "user",
//     action: (
//       <button>
//         <FaTrash />
//       </button>
//     ),
//   },
// ];

// const Customers = () => {
//   const [rows, setRows] = useState<DataType[]>(arr);

//   const Table = TableHOC<DataType>(
//     columns,
//     rows,
//     "dashboard-product-box",
//     "Customers",
//     rows.length > 6
//   )();

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main>{Table}</main>
//     </div>
//   );
// };

// export default Customers;

import { ReactElement } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/admin/TableHOC";
import { FaTrash } from "react-icons/fa";

interface DataType {
  avatar: string;
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
    cell: ({ row }) => (
      <img
        src={row.original.avatar}
        alt={row.getValue("name")}
        style={{ borderRadius: "50%" }}
      />
    ),
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

const img = "https://randomuser.me/api/portraits/women/54.jpg";
const img2 = "https://randomuser.me/api/portraits/women/50.jpg";

const productData: DataType[] = [
  {
    avatar: img,
    name: "Emay",
    email: "emay@gamil.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
  {
    avatar: img2,
    name: "Sam",
    email: "sam@gamil.com",
    gender: "female",
    role: "user",
    action: (
      <button>
        <FaTrash />
      </button>
    ),
  },
];

// interface DashboardTableProps {
//   data: DataType[];
// }

const Customers: React.FC = () => {
  const TableComponent = TableHOC<DataType>({
    columns,
    data: productData,
    containerClassName: "transaction-box",
    showPagination: true,
  });

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>
        <TableComponent />
      </main>
    </div>
  );
};

export default Customers;
