"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  Alert,
  Badge,
  Button,
  Dropdown,
  Form,
  ListGroup,
  Spinner,
} from "react-bootstrap";
import { FaEllipsisV, FaPlus } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import * as client from "../../client";
import {
  addQuiz,
  removeQuiz,
  setAttemptsForQuiz,
  setQuizzes,
  setQuizzesError,
  setQuizzesLoading,
  togglePublished,
} from "./reducer";
import {
  availabilityBadge,
  availabilityLabel,
  formatDate,
  getAvailability,
  getLatestAttempt,
  getMaxAttempts,
  getRemainingAttempts,
  getUsedAttempts,
} from "./utils";

export default function Quizzes() {
  const { cid } = useParams<{ cid: string }>();
  const router = useRouter();
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
      const loaded = await client.findQuizzesForCourse(cid);
      dispatch(setQuizzes(loaded));

      if (!isFaculty) {
        await Promise.all(
          loaded.map(async (q: any) => {
            try {
              const attempts = await client.findAttemptsForQuiz(q._id);
              dispatch(setAttemptsForQuiz({ quizId: q._id, attempts }));
            } catch {
              // skip quizzes the student can't access
            }
          })
        );
      }
    } catch {
      dispatch(setQuizzesError("Unable to load quizzes."));
    } finally {
      dispatch(setQuizzesLoading(false));
    }
  };

  useEffect(() => {
    loadData();
  }, [cid, isFaculty]);

  const handleCreateQuiz = async () => {
    const quiz = await client.createQuizForCourse(cid, {
      title: "Unnamed Quiz",
    });
    dispatch(addQuiz(quiz));
    router.push(`/courses/${cid}/quizzes/${quiz._id}/editor`);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!window.confirm("Delete this quiz?")) return;
    await client.deleteQuiz(quizId);
    dispatch(removeQuiz(quizId));
  };

  const handleTogglePublish = async (quizId: string, next: boolean) => {
    await client.publishQuiz(quizId, next);
    dispatch(togglePublished({ quizId, published: next }));
  };

  const visibleQuizzes = isFaculty
    ? quizzes
    : quizzes.filter((q: any) => q.published);

  return (
    <div id="wd-quizzes" className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">Quizzes</h3>
        {isFaculty && (
          <Button variant="danger" onClick={handleCreateQuiz}>
            <FaPlus className="me-2" />
            Quiz
          </Button>
        )}
      </div>

      {loading && (
        <div className="d-flex align-items-center gap-2 my-4">
          <Spinner size="sm" animation="border" />
          <span>Loading quizzes...</span>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && visibleQuizzes.length === 0 && (
        <div className="text-muted">No quizzes available.</div>
      )}

      <ListGroup>
        {visibleQuizzes.map((quiz: any) => {
          const attempts = (attemptsByQuiz[quiz._id] || []) as any[];
          const latest = getLatestAttempt(attempts);
          const remaining = getRemainingAttempts(quiz, attempts);
          const used = getUsedAttempts(attempts);
          const max = getMaxAttempts(quiz);
          const availability = getAvailability(quiz);

          return (
            <ListGroup.Item
              key={quiz._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2">
                  <Link
                    href={
                      isFaculty
                        ? `/courses/${cid}/quizzes/${quiz._id}/editor`
                        : `/courses/${cid}/quizzes/${quiz._id}`
                    }
                    className="fw-bold text-decoration-none"
                  >
                    {quiz.title || "Untitled Quiz"}
                  </Link>
                  <Badge bg={availabilityBadge(availability)}>
                    {availabilityLabel(availability)}
                  </Badge>
                  {isFaculty && (
                    <Badge bg={quiz.published ? "success" : "secondary"}>
                      {quiz.published ? "Published" : "Draft"}
                    </Badge>
                  )}
                </div>

                <div className="text-muted small mt-1">
                  Due: {formatDate(quiz.dueDate)} | Points: {quiz.points ?? 0}
                  {quiz.availableDate || quiz.untilDate ? (
                    <>
                      {" "}
                      | Available: {formatDate(quiz.availableDate)} -{" "}
                      {formatDate(quiz.untilDate)}
                    </>
                  ) : null}
                </div>

                {!isFaculty && latest && latest.submittedAt && (
                  <div className="mt-2">
                    <Badge bg="success">
                      Score: {Math.round((latest.score ?? 0) * 100) / 100} /{" "}
                      {quiz.points ?? 0}
                    </Badge>
                    <span className="text-muted small ms-2">
                      Attempts used: {used} / {max}
                    </span>
                  </div>
                )}
              </div>

              <div className="d-flex align-items-center gap-2">
                {!isFaculty ? (
                  <>
                    {latest?.submittedAt && (
                      <Link
                        href={`/courses/${cid}/quizzes/${quiz._id}/results?attempt=${latest._id}`}
                      >
                        <Button variant="outline-primary" size="sm">
                          View Results
                        </Button>
                      </Link>
                    )}
                    {remaining > 0 && availability === "AVAILABLE" && (
                      <Link href={`/courses/${cid}/quizzes/${quiz._id}`}>
                        <Button variant="primary" size="sm">
                          Start
                        </Button>
                      </Link>
                    )}
                  </>
                ) : (
                  <>
                    <Form.Check
                      type="switch"
                      id={`publish-${quiz._id}`}
                      label={quiz.published ? "Published" : "Unpublished"}
                      checked={!!quiz.published}
                      onChange={(e) =>
                        handleTogglePublish(quiz._id, e.target.checked)
                      }
                    />
                    <Dropdown align="end">
                      <Dropdown.Toggle
                        as="button"
                        variant="link"
                        className="btn btn-link p-1 text-dark"
                        aria-label="Quiz actions"
                      >
                        <FaEllipsisV />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          as={Link}
                          href={`/courses/${cid}/quizzes/${quiz._id}/editor`}
                        >
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleTogglePublish(quiz._id, !quiz.published)
                          }
                        >
                          {quiz.published ? "Unpublish" : "Publish"}
                        </Dropdown.Item>
                        <Dropdown.Item
                          as={Link}
                          href={`/courses/${cid}/quizzes/${quiz._id}`}
                        >
                          Preview
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item
                          className="text-danger"
                          onClick={() => handleDeleteQuiz(quiz._id)}
                        >
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </>
                )}
              </div>
            </ListGroup.Item>
          );
        })}
      </ListGroup>
    </div>
  );
}
