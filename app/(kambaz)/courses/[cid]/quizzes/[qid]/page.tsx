"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Alert, Button, Card, Form, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";
import { setAttemptsForQuiz, upsertAttempt } from "../reducer";
import {
  calculateQuizScore,
  getLatestSubmittedAttempt,
  getQuestionChoices,
  getQuestionId,
  getQuizQuestions,
  getQuizTitle,
  getRemainingAttempts,
} from "../utils";

export default function TakeQuizPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };

  const isFaculty = currentUser?.role === "FACULTY";

  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [activeAttempt, setActiveAttempt] = useState<any>(null);

  const { attemptsByQuiz } = useSelector((state: RootState) => state.quizzesReducer);
  const attempts = attemptsByQuiz[qid] || [];

  const latestSubmitted = useMemo(
    () => getLatestSubmittedAttempt(attempts),
    [attempts]
  );

  const loadQuiz = async () => {
    setLoading(true);
    setError("");
    try {
      const [loadedQuiz, loadedAttempts] = await Promise.all([
        client.findQuizById(qid),
        client.findMyAttemptsForQuiz(qid),
      ]);

      setQuiz(loadedQuiz);
      dispatch(setAttemptsForQuiz({ quizId: qid, attempts: loadedAttempts }));

      const submitted = getLatestSubmittedAttempt(loadedAttempts);
      if (!isFaculty && submitted) {
        router.replace(`/courses/${cid}/quizzes/${qid}/results?attempt=${submitted._id}`);
        return;
      }

      if (!isFaculty && loadedQuiz) {
        const remaining = getRemainingAttempts(loadedQuiz, loadedAttempts);
        if (remaining <= 0) {
          setError("No attempts remaining for this quiz.");
          return;
        }
      }

      try {
        if (!isFaculty) {
          const newAttempt = await client.startQuizAttempt(qid);
          setActiveAttempt(newAttempt);
          dispatch(upsertAttempt(newAttempt));
        }
      } catch {
        // If start endpoint is unavailable, fallback to local draft answers.
      }
    } catch {
      setError("Unable to load this quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadQuiz();
  }, [qid, isFaculty]);

  const questions = getQuizQuestions(quiz);

  const submitQuiz = async () => {
    if (!quiz) return;
    setSubmitting(true);
    setError("");

    try {
      const scoring = calculateQuizScore(quiz, answers);

      let submittedAttempt = null;
      if (activeAttempt?._id) {
        submittedAttempt = await client.submitQuizAttempt(qid, activeAttempt._id, {
          answers,
          score: scoring.percent,
          pointsEarned: scoring.pointsEarned,
        });
      }

      const finalAttempt = submittedAttempt || {
        ...activeAttempt,
        _id: activeAttempt?._id || `local-${Date.now()}`,
        quiz: qid,
        answers,
        score: scoring.percent,
        pointsEarned: scoring.pointsEarned,
        status: "SUBMITTED",
        submittedAt: new Date().toISOString(),
      };

      dispatch(upsertAttempt(finalAttempt));
      router.push(`/courses/${cid}/quizzes/${qid}/results?attempt=${finalAttempt._id}`);
    } catch {
      setError("Failed to submit quiz. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2">
        <Spinner size="sm" animation="border" />
        <span>Loading quiz...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert variant="danger" className="mb-3">
          {error}
        </Alert>
        {latestSubmitted && (
          <Button
            variant="outline-primary"
            onClick={() =>
              router.push(`/courses/${cid}/quizzes/${qid}/results?attempt=${latestSubmitted._id}`)
            }
          >
            View Results
          </Button>
        )}
      </div>
    );
  }

  return (
    <div id="wd-quiz-take">
      <h3 className="mb-3">{getQuizTitle(quiz)}</h3>

      {isFaculty && (
        <Alert variant="info">Faculty preview mode. Responses are not submitted.</Alert>
      )}

      {questions.length === 0 && (
        <Alert variant="warning">This quiz has no questions yet.</Alert>
      )}

      {questions.map((question, index) => {
        const questionId = getQuestionId(question, index);
        const choices = getQuestionChoices(question);
        return (
          <Card key={questionId} className="mb-3">
            <Card.Body>
              <Card.Title className="fs-6">
                {index + 1}. {question.title || `Question ${index + 1}`}
              </Card.Title>

              <Form>
                {choices.map((choice) => (
                  <Form.Check
                    key={`${questionId}-${choice}`}
                    type="radio"
                    name={questionId}
                    id={`${questionId}-${choice}`}
                    label={choice}
                    checked={answers[questionId] === choice}
                    onChange={(e) =>
                      setAnswers((prev) => ({ ...prev, [questionId]: e.target.value }))
                    }
                    value={choice}
                    className="mb-1"
                  />
                ))}
              </Form>
            </Card.Body>
          </Card>
        );
      })}

      {!isFaculty && questions.length > 0 && (
        <Button onClick={submitQuiz} disabled={submitting}>
          {submitting ? "Submitting..." : "Submit"}
        </Button>
      )}
    </div>
  );
}
