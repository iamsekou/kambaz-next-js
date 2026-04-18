"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Alert, Badge, Button, Card, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../../store";
import * as client from "../../../../client";
import { setAttemptsForQuiz, upsertAttempt } from "../../reducer";
import {
  calculateQuizScore,
  getLatestSubmittedAttempt,
  getQuestionId,
  getQuizQuestions,
  getQuizTitle,
  isAttemptSubmitted,
} from "../../utils";

export default function QuizResultsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const attemptId = searchParams.get("attempt") || "";

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { attemptsByQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const attempts = attemptsByQuiz[qid] || [];

  const submittedAttempt = useMemo(() => {
    if (attemptId) {
      return attempts.find((attempt: any) => attempt._id === attemptId) || null;
    }
    return getLatestSubmittedAttempt(attempts) || null;
  }, [attemptId, attempts]);

  const loadData = async () => {
    setLoading(true);
    setError("");

    try {
      const loadedQuiz = await client.findQuizById(qid);
      setQuiz(loadedQuiz);

      if (attemptId) {
        try {
          const attempt = await client.findAttemptById(attemptId);
          if (attempt) {
            dispatch(upsertAttempt(attempt));
          }
        } catch {
          // Attempt may already be in store; ignore fetch failure here.
        }
      }

      const loadedAttempts = await client.findMyAttemptsForQuiz(qid);
      dispatch(setAttemptsForQuiz({ quizId: qid, attempts: loadedAttempts }));
    } catch {
      setError("Unable to load quiz results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [qid, attemptId]);

  const answers = submittedAttempt?.answers || submittedAttempt?.responses || {};
  const scoring = quiz ? calculateQuizScore(quiz, answers) : null;
  const questions = getQuizQuestions(quiz);

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2">
        <Spinner size="sm" animation="border" />
        <span>Loading results...</span>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!submittedAttempt || !isAttemptSubmitted(submittedAttempt)) {
    return (
      <div>
        <Alert variant="warning" className="mb-3">
          No submitted attempt found for this quiz.
        </Alert>
        <Button onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>Go to Quiz</Button>
      </div>
    );
  }

  return (
    <div id="wd-quiz-results">
      <h3 className="mb-3">{getQuizTitle(quiz)} - Results</h3>

      <Card className="mb-3">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <div className="text-muted">Final Score</div>
              <div className="fs-4 fw-bold">
                {Math.round((submittedAttempt.score ?? scoring?.percent ?? 0) * 100) / 100}%
              </div>
            </div>
            <Badge bg="primary" className="fs-6">
              {Math.round((submittedAttempt.pointsEarned ?? scoring?.pointsEarned ?? 0) * 100) / 100}
              /
              {Math.round((scoring?.totalPoints ?? 0) * 100) / 100} pts
            </Badge>
          </div>
        </Card.Body>
      </Card>

      {questions.map((question, index) => {
        const questionId = getQuestionId(question, index);
        const graded = scoring?.graded.find((g) => g.questionId === questionId);
        const selectedAnswer = graded?.selectedAnswer || "No answer";
        const correctAnswer = graded?.correctAnswer || "N/A";
        const isCorrect = graded?.isCorrect || false;

        return (
          <Card key={questionId} className="mb-3">
            <Card.Body>
              <Card.Title className="fs-6 mb-3">
                {index + 1}. {question.title || `Question ${index + 1}`}
              </Card.Title>

              <div className="mb-2">
                <strong>Your answer:</strong> {selectedAnswer}
              </div>
              <div className="mb-2">
                <strong>Correct answer:</strong> {correctAnswer}
              </div>
              <Badge bg={isCorrect ? "success" : "danger"}>
                {isCorrect ? "Correct" : "Incorrect"}
              </Badge>
            </Card.Body>
          </Card>
        );
      })}

      <Button variant="secondary" onClick={() => router.push(`/courses/${cid}/quizzes`)}>
        Back to Quizzes
      </Button>
    </div>
  );
}
