"use client";
import { useContext, useEffect, useState } from "react";
import { Dialog } from "@headlessui/react";
import LeaderboardHeader from "./leaderboard-header";
import UserContext from "@/context/user-context";
import LeaderboardBody from "./leaderboard-body";

interface LeaderBoardModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}
export default function LeaderboardModal({
  isOpen,
  setIsOpen,
}: LeaderBoardModalProps) {
  const [boardData, setBoardData] = useState([]);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    async function fetchBoardData() {
      const response = await fetch("/api/board");
      const result = await response.json();
      const resultData = result.data;
      setBoardData(resultData);
    }
    async function fetchUserData() {
      const response = await fetch("/api/user");
      const result = await response.json();
      const resultData = result.data;
      setUserData(resultData);
    }
    fetchBoardData();
    fetchUserData();
  }, []);

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Panel>
        <div className="bg-white absolute h-full top-0 w-full sm:w-1/2 right-0">
          <LeaderboardHeader />
          <LeaderboardBody
            userData={userData}
            boardData={boardData}
            setBoardData={setBoardData}
          />
        </div>
      </Dialog.Panel>
    </Dialog>
  );
}
