"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Alert, Badge, Button, Card, Spinner } from "react-bootstrap";
import * as client from "../../../../client";
import { Question } from "../../utils";

type GradedAnswer = {
  questionId: string;
  answer: string;
  correct?: boolean;
  pointsEarned?: number;
};

export default function QuizResultsPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();

  const attemptId = searchParams.get("attempt") || "";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attempt, setAttempt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [loadedQuiz, loadedQuestions, attempts] = await Promise.all([
        client.findQuizById(qid),
        client.findQuestionsForQuiz(qid),
        client.findAttemptsForQuiz(qid),
      ]);
      setQuiz(loadedQuiz);
      setQuestions(loadedQuestions || []);

      const chosen =
        (attemptId && attempts.find((a: any) => a._id === attemptId)) ||
        attempts.find((a: any) => a.submittedAt) ||
        null;
      setAttempt(chosen);
    } catch {
      setError("Unable to load quiz results.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [qid, attemptId]);

  const answersById = useMemo(() => {
    const map: Record<string, GradedAnswer> = {};
    for (const a of (attempt?.answers as GradedAnswer[]) || []) {
      map[a.questionId] = a;
    }
    return map;
  }, [attempt]);

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 my-4">
        <Spinner size="sm" animation="border" />
        <span>Loading results...</span>
      </div>
    );
  }

  if (error) return <Alert variant="danger">{error}</Alert>;

  if (!attempt) {
    return (
      <div>
        <Alert variant="warning">No submitted attempt found.</Alert>
        <Button onClick={() => router.push(`/courses/${cid}/quizzes/${qid}`)}>
          Take Quiz
        </Button>
      </div>
    );
  }

  const totalPoints = quiz?.points ?? 0;
  const score = Number(attempt.score ?? 0);

  return (
    <div id="wd-quiz-results" className="mt-3">
      <h3 className="mb-3">{quiz?.title || "Quiz"} — Results</h3>

      <Card className="mb-3">
        <Card.Body className="d-flex justify-content-between align-items-center">
          <div>
            <div className="text-muted small">Final Score</div>
            <div className="fs-3 fw-bold">
              {Math.round(score * 100) / 100} / {totalPoints}
            </div>
          </div>
          <div className="text-muted small">
            Attempt #{attempt.attemptNumber}
            {attempt.submittedAt && (
              <> · Submitted {new Date(attempt.submittedAt).toLocaleString()}</>
            )}
          </div>
        </Card.Body>
      </Card>

      {questions.map((q, i) => {
        const graded = answersById[q._id];
        const studentAnswer = graded?.answer ?? "(no answer)";
        const isCorrect = !!graded?.correct;
        const earned = graded?.pointsEarned ?? 0;

        return (
          <Card key={q._id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <Card.Title className="fs-6 mb-0">
                  {i + 1}. {q.title}{" "}
                  <span className="text-muted small">
                    ({earned} / {q.points} pts)
                  </span>
                </Card.Title>
                <Badge bg={isCorrect ? "success" : "danger"}>
                  {isCorrect ? "Correct" : "Incorrect"}
                </Badge>
              </div>

              {q.question && <div className="mb-2">{q.question}</div>}

              <div className="mb-1">
                <strong>Your answer:</strong> {studentAnswer}
              </div>
              {!isCorrect && (
                <div className="text-muted small">
                  <strong>Correct answer:</strong> {describeCorrect(q)}
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}

      <Button
        variant="secondary"
        onClick={() => router.push(`/courses/${cid}/quizzes`)}
      >
        Back to Quizzes
      </Button>
    </div>
  );
}

function describeCorrect(q: Question) {
  if (q.type === "MULTIPLE_CHOICE") {
    return q.choices?.find((c) => c.isCorrect)?.text || "—";
  }
  if (q.type === "TRUE_FALSE") return q.correctAnswer || "—";
  return (q.correctAnswers || []).join(" / ") || "—";
}
