import React from "react";

import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

interface TableHOCProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  containerClassName: string;
  showPagination?: boolean;
}

function TableHOC<T extends object>({
  columns,
  data,
  containerClassName,
  showPagination = false,
}: TableHOCProps<T>) {
  return function TableComponent() {
    const [sorting, setSorting] = React.useState<SortingState>([]);

    const table = useReactTable({
      data: data ?? [],
      columns,
      initialState: { pagination: { pageIndex: 0, pageSize: 6 } },
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });

    const { pagination } = table.getState();

    return (
      <div className={containerClassName}>
        {/* <h2 className="heading">{heading}</h2> */}

        <table className="table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    onClick={column.column.getToggleSortingHandler()}
                  >
                    {column.column.columnDef.header as string}
                    {column.column.getIsSorted() ? (
                      column.column.getIsSorted() === "desc" ? (
                        <AiOutlineSortDescending />
                      ) : (
                        <AiOutlineSortAscending />
                      )
                    ) : null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id}>
                      {cell.column.columnDef.cell
                        ? flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )
                        : (cell.getValue() as React.ReactNode)}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} style={{ textAlign: "center" }}>
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {showPagination && (
          <div className="table-pagination">
            <button
              disabled={!table.getCanPreviousPage()}
              onClick={(e) => {
                e.preventDefault();
                table.previousPage();
              }}
            >
              Prev
            </button>
            <span>
              {((pagination.pageIndex as number) + 1).toString()} of{" "}
              {table.getPageCount()}
            </span>
            <button
              disabled={!table.getCanNextPage()}
              onClick={(e) => {
                e.preventDefault();
                table.nextPage();
              }}
            >
              Next
            </button>
          </div>
        )}
      </div>
    );
  };
}

export default TableHOC;
