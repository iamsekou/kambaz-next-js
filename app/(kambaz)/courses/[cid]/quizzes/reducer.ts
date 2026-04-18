import { createSlice } from "@reduxjs/toolkit";

type Quiz = {
  _id: string;
  course?: string;
  title?: string;
  due?: string;
  points?: number;
  published?: boolean;
  isPublished?: boolean;
  maxAttempts?: number;
  allowedAttempts?: number;
  attemptsAllowed?: number;
  questions?: any[];
};

type QuizAttempt = {
  _id: string;
  quiz: string;
  user?: string;
  score?: number;
  pointsEarned?: number;
  submittedAt?: string;
  status?: string;
  answers?: Record<string, string>;
};

type QuizzesState = {
  quizzes: Quiz[];
  attemptsByQuiz: Record<string, QuizAttempt[]>;
  loading: boolean;
  error: string;
};

const initialState: QuizzesState = {
  quizzes: [],
  attemptsByQuiz: {},
  loading: false,
  error: "",
};

const quizzesSlice = createSlice({
  name: "quizzes",
  initialState,
  reducers: {
    setQuizzes: (state, { payload }) => {
      state.quizzes = payload;
    },
    setAttemptsForQuiz: (
      state,
      {
        payload,
      }: {
        payload: { quizId: string; attempts: QuizAttempt[] };
      }
    ) => {
      state.attemptsByQuiz[payload.quizId] = payload.attempts;
    },
    setAttemptsForCourse: (
      state,
      { payload }: { payload: QuizAttempt[] }
    ) => {
      const nextByQuiz: Record<string, QuizAttempt[]> = {};
      payload.forEach((attempt) => {
        const quizId = attempt.quiz;
        if (!quizId) return;
        if (!nextByQuiz[quizId]) nextByQuiz[quizId] = [];
        nextByQuiz[quizId].push(attempt);
      });
      state.attemptsByQuiz = { ...state.attemptsByQuiz, ...nextByQuiz };
    },
    upsertAttempt: (state, { payload }: { payload: QuizAttempt }) => {
      const quizId = payload.quiz;
      if (!quizId) return;
      const currentAttempts = state.attemptsByQuiz[quizId] || [];
      const existing = currentAttempts.find((a) => a._id === payload._id);
      if (existing) {
        state.attemptsByQuiz[quizId] = currentAttempts.map((a) =>
          a._id === payload._id ? { ...a, ...payload } : a
        );
      } else {
        state.attemptsByQuiz[quizId] = [payload, ...currentAttempts];
      }
    },
    setQuizzesLoading: (state, { payload }: { payload: boolean }) => {
      state.loading = payload;
    },
    setQuizzesError: (state, { payload }: { payload: string }) => {
      state.error = payload;
    },
  },
});

export const {
  setQuizzes,
  setAttemptsForQuiz,
  setAttemptsForCourse,
  upsertAttempt,
  setQuizzesLoading,
  setQuizzesError,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
