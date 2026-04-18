export type QuizQuestion = {
  _id?: string;
  id?: string;
  title?: string;
  points?: number;
  choices?: any[];
  options?: any[];
  correctAnswer?: string;
  answer?: string;
};

export const getQuizTitle = (quiz: any) =>
  quiz?.title || quiz?.name || quiz?.quizTitle || "Untitled Quiz";

export const getQuizDue = (quiz: any) => quiz?.due || quiz?.dueDate || "No due date";

export const getQuizPoints = (quiz: any) => Number(quiz?.points || quiz?.totalPoints || 0);

export const getQuizMaxAttempts = (quiz: any) => {
  const raw =
    quiz?.maxAttempts ??
    quiz?.allowedAttempts ??
    quiz?.attemptsAllowed ??
    quiz?.attemptLimit ??
    1;
  const parsed = Number(raw);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : 1;
};

export const isQuizPublished = (quiz: any) => {
  if (typeof quiz?.published === "boolean") return quiz.published;
  if (typeof quiz?.isPublished === "boolean") return quiz.isPublished;
  if (typeof quiz?.status === "string") return quiz.status.toUpperCase() === "PUBLISHED";
  return false;
};

export const getQuizQuestions = (quiz: any): QuizQuestion[] => {
  if (Array.isArray(quiz?.questions)) return quiz.questions;
  if (Array.isArray(quiz?.questionList)) return quiz.questionList;
  if (Array.isArray(quiz?.items)) return quiz.items;
  return [];
};

export const getQuestionId = (question: QuizQuestion, index: number) =>
  question._id || question.id || `q-${index}`;

export const getQuestionPoints = (question: QuizQuestion, fallback: number) => {
  const value = Number(question.points);
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

export const getQuestionChoices = (question: QuizQuestion): string[] => {
  const rawChoices = Array.isArray(question.choices)
    ? question.choices
    : Array.isArray(question.options)
    ? question.options
    : [];

  return rawChoices.map((choice: any) => {
    if (typeof choice === "string") return choice;
    return choice?.text || choice?.label || choice?.value || "";
  });
};

export const getCorrectAnswer = (question: QuizQuestion): string => {
  if (typeof question.correctAnswer === "string") return question.correctAnswer;
  if (typeof question.answer === "string") return question.answer;

  const rawChoices = Array.isArray(question.choices)
    ? question.choices
    : Array.isArray(question.options)
    ? question.options
    : [];

  const correct = rawChoices.find(
    (choice: any) => choice?.isCorrect || choice?.correct === true
  );

  if (!correct) return "";
  if (typeof correct === "string") return correct;
  return correct?.text || correct?.label || correct?.value || "";
};

export const isAttemptSubmitted = (attempt: any) => {
  if (!attempt) return false;
  if (attempt.submittedAt) return true;
  if (typeof attempt.status === "string") {
    return attempt.status.toUpperCase() === "SUBMITTED";
  }
  return false;
};

export const sortAttemptsNewest = (attempts: any[]) =>
  [...attempts].sort((a, b) => {
    const aDate = new Date(a?.submittedAt || a?.updatedAt || a?.createdAt || 0).getTime();
    const bDate = new Date(b?.submittedAt || b?.updatedAt || b?.createdAt || 0).getTime();
    return bDate - aDate;
  });

export const getLatestSubmittedAttempt = (attempts: any[]) =>
  sortAttemptsNewest(attempts).find((attempt) => isAttemptSubmitted(attempt));

export const getUsedAttemptsCount = (attempts: any[]) =>
  attempts.filter((attempt) => isAttemptSubmitted(attempt)).length;

export const getRemainingAttempts = (quiz: any, attempts: any[]) =>
  Math.max(0, getQuizMaxAttempts(quiz) - getUsedAttemptsCount(attempts));

export const calculateQuizScore = (
  quiz: any,
  answers: Record<string, string>
): {
  pointsEarned: number;
  totalPoints: number;
  percent: number;
  graded: Array<{
    questionId: string;
    selectedAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    earned: number;
    possible: number;
  }>;
} => {
  const questions = getQuizQuestions(quiz);
  const totalPointsFromQuiz = getQuizPoints(quiz);
  const fallbackPointsPerQuestion =
    questions.length > 0 && totalPointsFromQuiz > 0
      ? totalPointsFromQuiz / questions.length
      : 1;

  let totalPoints = 0;
  let pointsEarned = 0;

  const graded = questions.map((question, index) => {
    const questionId = getQuestionId(question, index);
    const selectedAnswer = answers[questionId] || "";
    const correctAnswer = getCorrectAnswer(question);
    const possible = getQuestionPoints(question, fallbackPointsPerQuestion);
    const isCorrect =
      selectedAnswer.trim().toLowerCase() === correctAnswer.trim().toLowerCase();
    const earned = isCorrect ? possible : 0;

    totalPoints += possible;
    pointsEarned += earned;

    return {
      questionId,
      selectedAnswer,
      correctAnswer,
      isCorrect,
      earned,
      possible,
    };
  });

  const percent = totalPoints > 0 ? (pointsEarned / totalPoints) * 100 : 0;
  return { pointsEarned, totalPoints, percent, graded };
};
