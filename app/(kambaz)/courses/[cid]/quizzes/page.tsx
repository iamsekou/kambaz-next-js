"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Badge, Button, ListGroup, Spinner } from "react-bootstrap";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";
import {
  setAttemptsForCourse,
  setQuizzes,
  setQuizzesError,
  setQuizzesLoading,
} from "./reducer";
import {
  getLatestSubmittedAttempt,
  getQuizDue,
  getQuizPoints,
  getQuizTitle,
  getRemainingAttempts,
  getUsedAttemptsCount,
  isQuizPublished,
} from "./utils";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };

  const { quizzes, attemptsByQuiz, loading, error } = useSelector(
    (state: RootState) => state.quizzesReducer
  );

  const isFaculty = currentUser?.role === "FACULTY";

  const loadData = async () => {
    if (!cid) return;
    dispatch(setQuizzesLoading(true));
    dispatch(setQuizzesError(""));

    try {
      const loadedQuizzes = await client.findQuizzesForCourse(cid);
      dispatch(setQuizzes(loadedQuizzes));

      if (!isFaculty) {
        const myAttempts = await client.findMyAttemptsForCourse(cid);
        dispatch(setAttemptsForCourse(myAttempts));
      }
    } catch {
      dispatch(setQuizzesError("Unable to load quizzes right now."));
    } finally {
      dispatch(setQuizzesLoading(false));
    }
  };

  useEffect(() => {
    loadData();
  }, [cid, isFaculty]);

  const visibleQuizzes = isFaculty
    ? quizzes
    : quizzes.filter((quiz: any) => isQuizPublished(quiz));

  return (
    <div id="wd-quizzes" className="mt-3">
      <h3>Quizzes</h3>

      {loading && (
        <div className="d-flex align-items-center gap-2 my-4">
          <Spinner size="sm" animation="border" />
          <span>Loading quizzes...</span>
        </div>
      )}

      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && visibleQuizzes.length === 0 && (
        <div className="text-muted">No quizzes available.</div>
      )}

      <ListGroup>
        {visibleQuizzes.map((quiz: any) => {
          const attempts = attemptsByQuiz[quiz._id] || [];
          const latestSubmitted = getLatestSubmittedAttempt(attempts);
          const usedAttempts = getUsedAttemptsCount(attempts);
          const remainingAttempts = getRemainingAttempts(quiz, attempts);

          return (
            <ListGroup.Item
              key={quiz._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="fw-bold">{getQuizTitle(quiz)}</div>
                <div className="text-muted small">Due: {getQuizDue(quiz)}</div>
                <div className="text-muted small">Points: {getQuizPoints(quiz)}</div>

                {!isFaculty && latestSubmitted && (
                  <div className="mt-2">
                    <Badge bg="success">
                      Score: {Math.round(Number(latestSubmitted.score ?? 0) * 100) / 100}
                    </Badge>
                  </div>
                )}

                {!isFaculty && (
                  <div className="text-muted small mt-1">
                    Attempts used: {usedAttempts} | Remaining: {remainingAttempts}
                  </div>
                )}
              </div>

              {isFaculty ? (
                <Link href={`/courses/${cid}/quizzes/${quiz._id}`}>
                  <Button variant="secondary">Preview</Button>
                </Link>
              ) : (
                <div className="d-flex gap-2">
                  {latestSubmitted && (
                    <Link
                      href={`/courses/${cid}/quizzes/${quiz._id}/results?attempt=${latestSubmitted._id}`}
                    >
                      <Button variant="outline-primary">View Results</Button>
                    </Link>
                  )}

                  {remainingAttempts > 0 && (
                    <Link href={`/courses/${cid}/quizzes/${quiz._id}`}>
                      <Button variant="primary">Start</Button>
                    </Link>
                  )}
                </div>
              )}
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
