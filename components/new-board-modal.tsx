import { useState } from "react";
import Button from "./ui/button";

interface NewBoardModalProps {
  setShowNewBoard: (show: boolean) => void;
  boardData: any;
  setBoardData: (data: any) => void;
}
export default function NewBoardModal({
  setShowNewBoard,
  boardData,
  setBoardData,
}: NewBoardModalProps) {
  const [boardName, setBoardName] = useState("");
  const [boardLabel, setBoardLabel] = useState("");

  async function handleSave() {
    const response = await fetch("/api/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        board_name: boardName,
        label: boardLabel,
      }),
    });
    if (response.ok) {
      const newBoards = [
        ...boardData,
        {
          board_name: boardName,
          label: boardLabel,
          columns: [],
        },
      ];
      setBoardData(newBoards);
      setShowNewBoard(false);
    } else {
      console.log("error");
      console.log(response);
    }
  }
  return (
    <div className="absolute bottom-0 w-full h-1/2 bg-slate-100 text-black pl-3 flex flex-col">
      <h1 className="my-4">{`Add New Board`}</h1>
      <div className="flex-grow">
        <div className="flex mb-2">
          <p>Key:</p>
          <input
            className="ml-2 pl-2"
            type="text"
            placeholder="highest_score"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>
        <div className="flex mb-2">
          <p>Label:</p>
          <input
            className="ml-2 pl-2"
            type="text"
            placeholder="⚡️ Higest Score"
            value={boardLabel}
            onChange={(e) => setBoardLabel(e.target.value)}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <Button variant="highlight" onClick={handleSave}>
          Save
        </Button>
        <Button variant="ghost" onClick={() => setShowNewBoard(false)}>
          Close
        </Button>
      </div>
    </div>
  );
}
