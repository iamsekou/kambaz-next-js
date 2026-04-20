"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Badge, Button, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";
import { upsertAttempt } from "../reducer";
import {
  Question,
  getAvailability,
  getMaxAttempts,
  getRemainingAttempts,
  isAnswerCorrect,
} from "../utils";

export default function TakeOrPreviewQuizPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };
  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [facultyPreviewSubmitted, setFacultyPreviewSubmitted] =
    useState(false);

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [loadedQuiz, loadedQuestions] = await Promise.all([
        client.findQuizById(qid),
        client.findQuestionsForQuiz(qid),
      ]);
      setQuiz(loadedQuiz);
      setQuestions(loadedQuestions || []);

      if (!isFaculty) {
        const attempts = await client.findAttemptsForQuiz(qid);
        const remaining = getRemainingAttempts(loadedQuiz, attempts);

        if (remaining <= 0) {
          // no attempts left — send them to their most recent result
          const lastSubmitted = attempts.find((a: any) => a.submittedAt);
          if (lastSubmitted) {
            router.replace(
              `/courses/${cid}/quizzes/${qid}/results?attempt=${lastSubmitted._id}`
            );
            return;
          }
          setError("You have used all allowed attempts for this quiz.");
          return;
        }

        const availability = getAvailability(loadedQuiz);
        if (availability !== "AVAILABLE") {
          setError(
            availability === "NOT_OPEN"
              ? "This quiz is not open yet."
              : "This quiz is closed."
          );
          return;
        }
      }
    } catch {
      setError("Unable to load this quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [qid, isFaculty]);

  const submit = async () => {
    setSubmitting(true);
    setError("");
    try {
      if (isFaculty) {
        setFacultyPreviewSubmitted(true);
        return;
      }
      const payload = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer,
      }));
      const saved = await client.submitQuizAttempt(qid, payload);
      dispatch(upsertAttempt(saved));
      router.push(
        `/courses/${cid}/quizzes/${qid}/results?attempt=${saved._id}`
      );
    } catch (e: any) {
      setError(
        e?.response?.data?.message || "Failed to submit quiz. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 my-4">
        <Spinner size="sm" animation="border" />
        <span>Loading quiz...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert variant="warning">{error}</Alert>
        <Button
          variant="outline-secondary"
          onClick={() => router.push(`/courses/${cid}/quizzes`)}
        >
          Back to Quizzes
        </Button>
      </div>
    );
  }

  if (!quiz) return null;

  const previewScore = facultyPreviewSubmitted
    ? gradeLocally(questions, answers)
    : null;

  return (
    <div id="wd-quiz-take" className="mt-3">
      <h3 className="mb-1">{quiz.title}</h3>
      <div className="text-muted small mb-3">
        {quiz.points ?? 0} points · {getMaxAttempts(quiz)} attempt
        {getMaxAttempts(quiz) === 1 ? "" : "s"} allowed
      </div>

      {isFaculty && !facultyPreviewSubmitted && (
        <Alert variant="info">
          Faculty preview. Answers aren&apos;t saved — scoring happens locally.
        </Alert>
      )}

      {quiz.description && (
        <Card className="mb-3">
          <Card.Body>{quiz.description}</Card.Body>
        </Card>
      )}

      {questions.length === 0 && (
        <Alert variant="warning">This quiz has no questions yet.</Alert>
      )}

      {questions.map((q, i) => {
        const showAnswerReveal = facultyPreviewSubmitted;
        const studentAnswer = answers[q._id] || "";
        const correct = showAnswerReveal
          ? isAnswerCorrect(q, studentAnswer)
          : false;

        return (
          <Card key={q._id} className="mb-3">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <Card.Title className="fs-6">
                  {i + 1}. {q.title}{" "}
                  <span className="text-muted small">({q.points} pts)</span>
                </Card.Title>
                {showAnswerReveal && (
                  <Badge bg={correct ? "success" : "danger"}>
                    {correct ? "Correct" : "Incorrect"}
                  </Badge>
                )}
              </div>

              {q.question && <div className="mb-3">{q.question}</div>}

              {q.type === "MULTIPLE_CHOICE" &&
                (q.choices || []).map((choice, ci) => (
                  <Form.Check
                    key={ci}
                    type="radio"
                    name={q._id}
                    id={`${q._id}-${ci}`}
                    label={choice.text}
                    value={choice.text}
                    checked={answers[q._id] === choice.text}
                    disabled={facultyPreviewSubmitted}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q._id]: e.target.value,
                      }))
                    }
                  />
                ))}

              {q.type === "TRUE_FALSE" && (
                <>
                  <Form.Check
                    type="radio"
                    name={q._id}
                    id={`${q._id}-true`}
                    label="True"
                    value="true"
                    checked={answers[q._id] === "true"}
                    disabled={facultyPreviewSubmitted}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q._id]: e.target.value,
                      }))
                    }
                  />
                  <Form.Check
                    type="radio"
                    name={q._id}
                    id={`${q._id}-false`}
                    label="False"
                    value="false"
                    checked={answers[q._id] === "false"}
                    disabled={facultyPreviewSubmitted}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q._id]: e.target.value,
                      }))
                    }
                  />
                </>
              )}

              {q.type === "FILL_IN_BLANK" && (
                <Form.Control
                  value={answers[q._id] || ""}
                  placeholder="Your answer"
                  disabled={facultyPreviewSubmitted}
                  onChange={(e) =>
                    setAnswers((prev) => ({
                      ...prev,
                      [q._id]: e.target.value,
                    }))
                  }
                />
              )}

              {showAnswerReveal && (
                <div className="mt-2 text-muted small">
                  Correct answer: {describeCorrectAnswer(q)}
                </div>
              )}
            </Card.Body>
          </Card>
        );
      })}

      {questions.length > 0 && !facultyPreviewSubmitted && (
        <Button onClick={submit} disabled={submitting}>
          {submitting ? "Submitting..." : isFaculty ? "Check Answers" : "Submit"}
        </Button>
      )}

      {previewScore && (
        <Alert variant="info" className="mt-3">
          Preview score: {previewScore.earned} / {previewScore.total}
        </Alert>
      )}
    </div>
  );
}

function describeCorrectAnswer(q: Question) {
  if (q.type === "MULTIPLE_CHOICE") {
    return q.choices?.find((c) => c.isCorrect)?.text || "—";
  }
  if (q.type === "TRUE_FALSE") return q.correctAnswer || "—";
  return (q.correctAnswers || []).join(" / ") || "—";
}

function gradeLocally(questions: Question[], answers: Record<string, string>) {
  let earned = 0;
  let total = 0;
  for (const q of questions) {
    total += q.points;
    if (isAnswerCorrect(q, answers[q._id] || "")) earned += q.points;
  }
  return { earned, total };
}
