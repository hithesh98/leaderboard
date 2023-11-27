"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useContext, useState } from "react";
import UserContext from "@/context/user-context";

type TableProps = {
  userData: any;
  boardData: any;
  setShowNewCol: any;
  newColCallback: any;
  setShowCol: any;
  columnConfCallback: any;
  setBoard: any;
  setShowNewBoard: any;
};
export default function Table({
  userData,
  boardData,
  setShowNewCol,
  newColCallback,
  setShowCol,
  columnConfCallback,
  setBoard,
  setShowNewBoard,
}: TableProps) {
  const [data, setData] = useState(userData);

  const columns = boardData.columns.map((column: any) => ({
    accessorKey: column.key,
    header: column.header,
    cell: (props: any) => <p>{props.getValue()}</p>,
  }));

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  const { user } = useContext(UserContext);

  function handleNewColClick() {
    setShowNewBoard(false);
    setShowCol(false);
    setShowNewCol(true);
    newColCallback(boardData);
  }

  return (
    <table>
      <thead className={`bg-gray-200  w-[${table.getTotalSize()}]`}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className="">
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className={`border-black-200 border-2 w-[${header.getSize}] cursor-pointer`}
                onClick={() => {
                  if (user !== "creator") {
                    return;
                  }
                  setShowNewBoard(false);
                  setShowNewCol(false);
                  columnConfCallback(
                    // @ts-ignore
                    header.column.columnDef.accessorKey as String
                  );
                  setBoard(boardData);
                }}
              >
                {header.column.columnDef.header as String}
              </th>
            ))}
            {user === "creator" && (
              <th
                onClick={handleNewColClick}
                className="w-6 border-0 px-3 bg-white text-primaryRed hover:bg-primaryRed hover:text-white cursor-pointer"
              >
                +
              </th>
            )}
          </tr>
        ))}
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`border-black-200 border-2 p-2 bg-white w-[${cell.column.getSize()}]`}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </thead>
    </table>
  );
}
