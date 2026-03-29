import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  enrollments: [],
};

const enrollmentsSlice = createSlice({
  name: "enrollments",
  initialState,
  reducers: {
    setEnrollments: (state, { payload }) => {
      state.enrollments = payload;
    },
    enroll: (state, { payload }) => {
      const exists = state.enrollments.find(
        (e: any) => e.user === payload.user && e.course === payload.course
      );
      if (!exists) {
        state.enrollments = [...state.enrollments, payload] as any;
      }
    },
    unenroll: (state, { payload }) => {
      state.enrollments = state.enrollments.filter(
        (e: any) =>
          !(e.user === payload.user && e.course === payload.course)
      ) as any;
    },
  },
});

export const { setEnrollments, enroll, unenroll } =
  enrollmentsSlice.actions;

export default enrollmentsSlice.reducer;