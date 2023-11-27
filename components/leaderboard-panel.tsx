"use client";
import { useState } from "react";
import LeaderboardModal from "./leaderboard-modal";
import UserContext from "@/context/user-context";

interface LeaderboardPanelProps {
  user: "player" | "creator";
}

export default function LeaderboardPanel({ user }: LeaderboardPanelProps) {
  let [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <UserContext.Provider value={{ user: user }}>
        <button className="right-0" onClick={() => setIsOpen(!isOpen)}>
          Menu
        </button>
        {isOpen && <LeaderboardModal isOpen={isOpen} setIsOpen={setIsOpen} />}
      </UserContext.Provider>
    </>
  );
}
