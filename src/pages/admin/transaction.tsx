// import { ReactElement, useState } from "react";
// import { Link } from "react-router-dom";
// import { Column } from "react-table";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import TableHOC from "../../components/admin/TableHOC";

// interface DataType {
//   user: string;
//   amount: number;
//   discount: number;
//   quantity: number;
//   status: ReactElement;
//   action: ReactElement;
// }

// const arr: Array<DataType> = [
//   {
//     user: "Charas",
//     amount: 4500,
//     discount: 400,
//     status: <span className="red">Processing</span>,
//     quantity: 3,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },

//   {
//     user: "Xavirors",
//     amount: 6999,
//     discount: 400,
//     status: <span className="green">Shipped</span>,
//     quantity: 6,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },
//   {
//     user: "Xavirors",
//     amount: 6999,
//     discount: 400,
//     status: <span className="purple">Delivered</span>,
//     quantity: 6,
//     action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
//   },
// ];

// const columns: Column<DataType>[] = [
//   {
//     Header: "Avatar",
//     accessor: "user",
//   },
//   {
//     Header: "Amount",
//     accessor: "amount",
//   },
//   {
//     Header: "Discount",
//     accessor: "discount",
//   },
//   {
//     Header: "Quantity",
//     accessor: "quantity",
//   },
//   {
//     Header: "Status",
//     accessor: "status",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//   },
// ];

// const Transaction = () => {
//   const [rows, setRows] = useState<DataType[]>(arr);

//   const Table = TableHOC<DataType>(
//     columns,
//     rows,
//     "dashboard-product-box",
//     "Transactions",
//     rows.length > 6
//   )();
//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main>{Table}</main>
//     </div>
//   );
// };

// export default Transaction;

import { ReactElement, useState } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { ColumnDef } from "@tanstack/react-table";
import TableHOC from "../../components/admin/TableHOC";
import { Link } from "react-router-dom";

type DataType = {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
};

const column: ColumnDef<DataType>[] = [
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

const arr: DataType[] = [
  {
    user: "Kyaw Naing",
    amount: 3848,
    quantity: 25,
    discount: 3884,
    status: <span className="red">Processing</span>,
    action: <Link to={`/admin/transaction/09023`}>Manage</Link>,
  },
  {
    user: "Kyaw Naing",
    amount: 3848,
    quantity: 25,
    discount: 3884,
    status: <span className="green">Shipped</span>,
    action: <Link to={`/admin/transaction/09023`}>Manage</Link>,
  },
  {
    user: "Kyaw Naing",
    amount: 3848,
    quantity: 25,
    discount: 3884,
    status: <span className="purple">Delivered</span>,
    action: <Link to={`/admin/transaction/09023`}>Manage</Link>,
  },
];

const Transaction = () => {
  const [data] = useState<DataType[]>(arr);

  const TableComponent = TableHOC<DataType>({
    columns: column,
    data: data,
    containerClassName: "dashboard-product-box",
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

export default Transaction;
