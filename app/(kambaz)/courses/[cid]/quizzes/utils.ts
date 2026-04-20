export type QuestionType = "MULTIPLE_CHOICE" | "TRUE_FALSE" | "FILL_IN_BLANK";

export type Choice = { text: string; isCorrect?: boolean };

export type Question = {
  _id: string;
  quiz: string;
  title: string;
  type: QuestionType;
  points: number;
  question: string;
  choices?: Choice[];
  correctAnswer?: string;
  correctAnswers?: string[];
};

export type Attempt = {
  _id: string;
  quiz: string;
  student?: string;
  score: number;
  attemptNumber: number;
  submittedAt?: string;
  answers: Array<{
    questionId: string;
    answer: string;
    correct?: boolean;
    pointsEarned?: number;
  }>;
};

const parseDate = (value?: string): Date | null => {
  if (!value) return null;
  const d = new Date(value);
  return isNaN(d.getTime()) ? null : d;
};

export type Availability = "NOT_OPEN" | "AVAILABLE" | "CLOSED";

export const getAvailability = (
  quiz: { availableDate?: string; untilDate?: string },
  now: Date = new Date()
): Availability => {
  const available = parseDate(quiz.availableDate);
  const until = parseDate(quiz.untilDate);
  if (available && now < available) return "NOT_OPEN";
  if (until && now > until) return "CLOSED";
  return "AVAILABLE";
};

export const availabilityLabel = (a: Availability) =>
  a === "AVAILABLE" ? "Available" : a === "CLOSED" ? "Closed" : "Not open yet";

export const availabilityBadge = (a: Availability) =>
  a === "AVAILABLE" ? "success" : a === "CLOSED" ? "secondary" : "warning";

export const formatDate = (value?: string) => {
  const d = parseDate(value);
  if (!d) return "—";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getMaxAttempts = (quiz: {
  multipleAttempts?: boolean;
  howManyAttempts?: number;
}) => {
  if (!quiz.multipleAttempts) return 1;
  const n = Number(quiz.howManyAttempts);
  return Number.isFinite(n) && n > 0 ? n : 1;
};

export const getUsedAttempts = (attempts: Attempt[]) =>
  attempts.filter((a) => a.submittedAt).length;

export const getRemainingAttempts = (
  quiz: { multipleAttempts?: boolean; howManyAttempts?: number },
  attempts: Attempt[]
) => Math.max(0, getMaxAttempts(quiz) - getUsedAttempts(attempts));

export const sortAttemptsNewest = (attempts: Attempt[]) =>
  [...attempts].sort((a, b) => {
    const aT = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
    const bT = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
    return bT - aT;
  });

export const getLatestAttempt = (attempts: Attempt[]) =>
  sortAttemptsNewest(attempts)[0] || null;

export const isAnswerCorrect = (
  question: Question,
  answer: string
): boolean => {
  const a = (answer || "").trim().toLowerCase();
  if (!a) return false;

  if (question.type === "MULTIPLE_CHOICE") {
    const correct = question.choices?.find((c) => c.isCorrect);
    return !!correct && a === (correct.text || "").trim().toLowerCase();
  }
  if (question.type === "TRUE_FALSE") {
    return a === (question.correctAnswer || "").trim().toLowerCase();
  }
  if (question.type === "FILL_IN_BLANK") {
    return (question.correctAnswers || []).some(
      (c) => c.trim().toLowerCase() === a
    );
  }
  return false;
};

export const emptyQuestion = (quizId: string, type: QuestionType): Question => {
  const base: Question = {
    _id: "",
    quiz: quizId,
    title: "New Question",
    type,
    points: 1,
    question: "",
  };
  if (type === "MULTIPLE_CHOICE") {
    return {
      ...base,
      choices: [
        { text: "", isCorrect: true },
        { text: "", isCorrect: false },
      ],
    };
  }
  if (type === "TRUE_FALSE") {
    return { ...base, correctAnswer: "true" };
  }
  return { ...base, correctAnswers: [""] };
};
