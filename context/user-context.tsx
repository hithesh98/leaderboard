"use client";

import { createContext } from "react";

type UserContextType = {
  user: "player" | "creator";
};

const UserContext = createContext<UserContextType>({ user: "player" });

export default UserContext;
