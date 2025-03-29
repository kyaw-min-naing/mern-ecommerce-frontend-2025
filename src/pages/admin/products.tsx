// import { ReactElement, useState } from "react";
// import { FaPlus } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import { Column } from "react-table";
// import AdminSidebar from "../../components/admin/AdminSidebar";
// import TableHOC from "../../components/admin/TableHOC";

// interface DataType {
//   photo: ReactElement;
//   name: string;
//   price: number;
//   stock: number;
//   action: ReactElement;
// }

// const columns: Column<DataType>[] = [
//   {
//     Header: "Photo",
//     accessor: "photo",
//   },
//   {
//     Header: "Name",
//     accessor: "name",
//   },
//   {
//     Header: "Price",
//     accessor: "price",
//   },
//   {
//     Header: "Stock",
//     accessor: "stock",
//   },
//   {
//     Header: "Action",
//     accessor: "action",
//   },
// ];

// const img =
//   "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

// const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

// const arr: Array<DataType> = [
//   {
//     photo: <img src={img} alt="Shoes" />,
//     name: "Puma Shoes Air Jordan Cook Nigga 2023",
//     price: 690,
//     stock: 3,
//     action: <Link to="/admin/product/sajknaskd">Manage</Link>,
//   },

//   {
//     photo: <img src={img2} alt="Shoes" />,
//     name: "Macbook",
//     price: 232223,
//     stock: 213,
//     action: <Link to="/admin/product/sdaskdnkasjdn">Manage</Link>,
//   },
// ];

// const Products = () => {
//   const [rows, setRows] = useState<DataType[]>(arr);

//   const Table = TableHOC<DataType>(
//     columns,
//     rows,
//     "dashboard-product-box",
//     "Products",
//     rows.length > 6
//   )();

//   return (
//     <div className="admin-container">
//       <AdminSidebar />
//       <main>{Table}</main>
//       <Link to="/admin/product/new" className="create-product-btn">
//         <FaPlus />
//       </Link>
//     </div>
//   );
// };

// export default Products;

import { ReactElement } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { ColumnDef } from "@tanstack/react-table";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

interface DataType {
  photo: string;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: ColumnDef<DataType>[] = [
  {
    accessorKey: "photo",
    header: "Photo",
    cell: ({ row }) => (
      <img
        src={row.original.photo}
        alt={row.getValue("name")}
        width={50}
        height={50}
      />
    ),
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "action",
    header: "Action",
    cell: ({ row }) => row.original.action,
  },
];

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const img2 = "https://m.media-amazon.com/images/I/514T0SvwkHL._SL1500_.jpg";

const productData: DataType[] = [
  {
    photo: img,
    name: "Air Jorden",
    price: 680,
    stock: 3,
    action: <Link to="/admin/product/2838">Manage</Link>,
  },
  {
    photo: img2,
    name: "Macbook",
    price: 2300,
    stock: 212,
    action: <Link to="/admin/product/983200">Manage</Link>,
  },
  {
    photo: img,
    name: "Air Jorden",
    price: 680,
    stock: 3,
    action: <Link to="/admin/product/2838">Manage</Link>,
  },
  {
    photo: img2,
    name: "Macbook",
    price: 2300,
    stock: 212,
    action: <Link to="/admin/product/983200">Manage</Link>,
  },
  {
    photo: img,
    name: "Air Jorden",
    price: 680,
    stock: 3,
    action: <Link to="/admin/product/2838">Manage</Link>,
  },
  {
    photo: img2,
    name: "Macbook",
    price: 2300,
    stock: 212,
    action: <Link to="/admin/product/983200">Manage</Link>,
  },
  {
    photo: img,
    name: "Air Jorden",
    price: 680,
    stock: 3,
    action: <Link to="/admin/product/2838">Manage</Link>,
  },
  {
    photo: img,
    name: "Air Jorden",
    price: 680,
    stock: 3,
    action: <Link to="/admin/product/2838">Manage</Link>,
  },
];

// interface DashboardTableProps {
//   data: DataType[];
// }

const Products: React.FC = () => {
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
        <Link to="/admin/product/new" className="create-product-btn">
          <FaPlus />
        </Link>
      </main>
    </div>
  );
};

export default Products;
