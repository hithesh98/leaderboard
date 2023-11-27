import { Board, User } from "@/db/types";
import { Tab } from "@headlessui/react";
import Table from "./table";
import { useContext, useState } from "react";
import NewColModal from "./new-col-modal";
import ColumnConfigModal from "./column-config-modal";
import Button from "./ui/button";
import NewBoardModal from "./new-board-modal";
import UserContext from "@/context/user-context";

interface LeaderboardBodyProps {
  boardData: Board[] | undefined;
  userData: User[] | undefined;
  setBoardData: any;
}
export default function LeaderboardBody({
  boardData,
  userData,
  setBoardData,
}: LeaderboardBodyProps) {
  const [showNewCol, setShowNewCol] = useState(false);
  const [board, setBoard] = useState<Board | null>(null);
  const [showCol, setShowCol] = useState(true);
  const [columnKey, setColumnKey] = useState<string | null>(null);
  const [showNewBoard, setShowNewBoard] = useState(false);
  const { user } = useContext(UserContext);

  function handleNewColCallback(board: Board) {
    setBoard(board);
  }
  function handleColConfCallback(columnKey: string) {
    setColumnKey(columnKey);
    setShowCol(true);
  }

  function handleDelete(columnKey: string) {
    const updatedBoardData = boardData?.map((board) => {
      if (board.board_name === board.board_name) {
        return {
          ...board,
          columns: board.columns.filter((col: any) => col.key !== columnKey),
        };
      }
      return board;
    });
    setBoardData(updatedBoardData);
  }
  return (
    <Tab.Group>
      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Tab.List className="text-black flex flex-col gap-3 pl-3">
          {boardData &&
            boardData.length > 0 &&
            boardData.map((data, index) => (
              <Tab
                key={`${index}-${data.board_name} `}
                className={({ selected }) =>
                  selected ? "text-left font-bold" : "text-left font-normal"
                }
              >
                {data.label}
              </Tab>
            ))}
          {user === "creator" && (
            <Button
              variant="highlight"
              onClick={() => {
                setShowNewCol(false);
                setShowCol(false);
                setShowNewBoard(true);
              }}
            >
              Add Leaderboard
            </Button>
          )}
        </Tab.List>
        <Tab.Panels className="text-black flex-grow text-sm pl-3 sm:pl-0">
          {boardData &&
            boardData.length > 0 &&
            boardData.map((board) => (
              <Tab.Panel key={board.board_name}>
                {userData && userData.length > 0 && (
                  <Table
                    userData={userData}
                    boardData={board}
                    setShowNewCol={setShowNewCol}
                    newColCallback={handleNewColCallback}
                    setShowCol={setShowCol}
                    columnConfCallback={handleColConfCallback}
                    setBoard={setBoard}
                    setShowNewBoard={setShowNewBoard}
                  />
                )}
              </Tab.Panel>
            ))}
        </Tab.Panels>
      </div>
      {showNewCol && board && user === "creator" && (
        <NewColModal setShowNewCol={setShowNewCol} board={board} />
      )}
      {showCol && board && boardData && columnKey && user === "creator" && (
        <ColumnConfigModal
          setShowCol={setShowCol}
          board={board}
          columnKey={columnKey}
          deleteCallback={handleDelete}
          boardData={boardData}
          setBoardData={setBoardData}
        />
      )}
      {showNewBoard && user === "creator" && (
        <NewBoardModal
          setShowNewBoard={setShowNewBoard}
          boardData={boardData}
          setBoardData={setBoardData}
        />
      )}
    </Tab.Group>
  );
}
