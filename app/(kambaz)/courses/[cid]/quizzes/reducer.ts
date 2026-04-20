import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Quiz = {
  _id: string;
  course?: string;
  title?: string;
  description?: string;
  quizType?: string;
  assignmentGroup?: string;
  points?: number;
  published?: boolean;
  shuffleAnswers?: boolean;
  timeLimit?: number;
  multipleAttempts?: boolean;
  howManyAttempts?: number;
  showCorrectAnswers?: string;
  accessCode?: string;
  oneQuestionAtATime?: boolean;
  webcamRequired?: boolean;
  lockQuestionsAfterAnswering?: boolean;
  dueDate?: string;
  availableDate?: string;
  untilDate?: string;
};

type QuizAttempt = {
  _id: string;
  quiz: string;
  student?: string;
  score?: number;
  attemptNumber?: number;
  submittedAt?: string;
  answers?: Array<{
    questionId: string;
    answer: string;
    correct?: boolean;
    pointsEarned?: number;
  }>;
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
    setQuizzes: (state, { payload }: PayloadAction<Quiz[]>) => {
      state.quizzes = payload;
    },
    addQuiz: (state, { payload }: PayloadAction<Quiz>) => {
      state.quizzes.push(payload);
    },
    updateQuizInList: (state, { payload }: PayloadAction<Quiz>) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === payload._id ? { ...q, ...payload } : q
      );
    },
    removeQuiz: (state, { payload }: PayloadAction<string>) => {
      state.quizzes = state.quizzes.filter((q) => q._id !== payload);
    },
    togglePublished: (
      state,
      { payload }: PayloadAction<{ quizId: string; published: boolean }>
    ) => {
      state.quizzes = state.quizzes.map((q) =>
        q._id === payload.quizId ? { ...q, published: payload.published } : q
      );
    },
    setAttemptsForQuiz: (
      state,
      {
        payload,
      }: PayloadAction<{ quizId: string; attempts: QuizAttempt[] }>
    ) => {
      state.attemptsByQuiz[payload.quizId] = payload.attempts;
    },
    upsertAttempt: (state, { payload }: PayloadAction<QuizAttempt>) => {
      const quizId = payload.quiz;
      if (!quizId) return;
      const current = state.attemptsByQuiz[quizId] || [];
      const existing = current.find((a) => a._id === payload._id);
      state.attemptsByQuiz[quizId] = existing
        ? current.map((a) => (a._id === payload._id ? { ...a, ...payload } : a))
        : [payload, ...current];
    },
    setQuizzesLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setQuizzesError: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
    },
  },
});

export const {
  setQuizzes,
  addQuiz,
  updateQuizInList,
  removeQuiz,
  togglePublished,
  setAttemptsForQuiz,
  upsertAttempt,
  setQuizzesLoading,
  setQuizzesError,
} = quizzesSlice.actions;

export default quizzesSlice.reducer;
