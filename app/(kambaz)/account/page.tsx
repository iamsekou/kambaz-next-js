"use client";

import { useSelector } from "react-redux";
import { RootState } from "../store";
import Profile from "./profile/page";
import Signin from "./signin/page";

export default function Account() {
  const { currentUser } = useSelector((state: RootState) => state.accountReducer);

  return currentUser ? <Profile /> : <Signin />;
}