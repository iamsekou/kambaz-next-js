import { createSlice } from "@reduxjs/toolkit";
import * as db from "../../../database";

const initialState = {
  assignments: db.assignments,
};

const assignmentSlice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      state.assignments = [
        ...state.assignments,
        { ...payload, _id: new Date().getTime().toString() },
      ];
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === payload._id ? payload : a
      );
    },
    deleteAssignment: (state, { payload }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== payload
      );
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentSlice.actions;
export default assignmentSlice.reducer;