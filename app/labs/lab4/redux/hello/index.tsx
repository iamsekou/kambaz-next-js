"use client";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";

export default function HelloRedux() {
  const message = useSelector((s: RootState) => s.helloReducer.message);

  return (
    <div>
      <h3>Hello Redux</h3>
      <h4>{message}</h4>
    </div>
  );
}