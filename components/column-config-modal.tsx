import { Board } from "@/db/types";
import Button from "./ui/button";
import { useEffect, useState } from "react";

interface ColumnConfigModalProps {
  setShowCol: (show: boolean) => void;
  board: Board;
  columnKey: string;
  deleteCallback: (columnKey: string) => void;
  boardData: Board[];
  setBoardData: (data: any) => void;
}
export default function ColumnConfigModal({
  setShowCol,
  board,
  columnKey,
  deleteCallback,
  boardData,
  setBoardData,
}: ColumnConfigModalProps) {
  const [label, setLabel] = useState(
    board.columns.find((col: any) => col.key === columnKey)?.header ?? ""
  );
  useEffect(() => {
    setLabel(
      board.columns.find((col: any) => col.key === columnKey)?.header ?? ""
    );
  }, [columnKey]);

  async function handleSave() {
    const response = await fetch(`/api/board`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_name: board.board_name,
        data: { key: columnKey, header: label },
      }),
    });
    if (response.ok) {
      const updatedBoardData = boardData.map((data) => {
        if (data.board_name === board.board_name) {
          return {
            ...data,
            columns: data.columns.map((col: any) =>
              col.key === columnKey ? { ...col, header: label } : col
            ),
          };
        }
        return data;
      });
      setBoardData(updatedBoardData);
      setShowCol(false);
    } else {
      console.log("error");
      console.log(response);
    }
  }

  async function handleDelete() {
    const response = await fetch(`/api/board`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_name: board.board_name,
        column_key: columnKey,
      }),
    });
    if (response.ok) {
      deleteCallback(columnKey);
      setShowCol(false);
    } else {
      console.log("error");
      console.log(response);
    }
  }
  return (
    <div className="absolute bottom-0 w-full h-1/2 bg-slate-100 text-black pl-3 flex flex-col">
      <h1 className="my-4">{`Edit ${columnKey} Column`}</h1>
      <div className="flex-grow">
        <div className="flex">
          <p>Label:</p>
          <input
            type="text"
            maxLength={20}
            className="w-[200px] text-sm pl-2"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <Button
          className="mt-2 text-sm"
          variant="secondary"
          onClick={handleDelete}
        >
          Delete
        </Button>
      </div>
      <div className="flex gap-3">
        <Button variant="highlight" onClick={handleSave}>
          Save
        </Button>
        <Button variant="ghost" onClick={() => setShowCol(false)}>
          Close
        </Button>
      </div>
    </div>
  );
}
