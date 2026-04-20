"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Alert,
  Button,
  Card,
  Col,
  Form,
  ListGroup,
  Row,
  Spinner,
  Tab,
  Tabs,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import * as client from "../../../../client";
import { Question, QuestionType, emptyQuestion } from "../../utils";
import QuestionEditor from "./QuestionEditor";

type Draft = Question & { _isNew?: boolean };

export default function QuizEditorPage() {
  const { cid, qid } = useParams<{ cid: string; qid: string }>();
  const router = useRouter();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [draft, setDraft] = useState<Draft | null>(null);

  const load = async () => {
    setLoading(true);
    try {
      const [loadedQuiz, loadedQuestions] = await Promise.all([
        client.findQuizById(qid),
        client.findQuestionsForQuiz(qid),
      ]);
      setQuiz(loadedQuiz);
      setQuestions(loadedQuestions || []);
    } catch {
      setError("Unable to load quiz.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, [qid]);

  const updateField = (patch: any) =>
    setQuiz((prev: any) => ({ ...prev, ...patch }));

  const saveDetails = async () => {
    setSaving(true);
    setError("");
    try {
      await client.updateQuiz(qid, quiz);
    } catch {
      setError("Failed to save quiz details.");
    } finally {
      setSaving(false);
    }
  };

  const saveAndReturn = async () => {
    await saveDetails();
    router.push(`/courses/${cid}/quizzes`);
  };

  const startNewQuestion = (type: QuestionType) => {
    setDraft({ ...emptyQuestion(qid, type), _isNew: true });
  };

  const startEdit = (q: Question) => {
    setDraft({ ...q });
  };

  const saveDraft = async () => {
    if (!draft) return;
    setSaving(true);
    try {
      if (draft._isNew) {
        const { _id, _isNew, ...payload } = draft;
        const saved = await client.createQuestionForQuiz(qid, payload);
        setQuestions((prev) => [...prev, saved]);
      } else {
        const { _isNew, ...payload } = draft;
        await client.updateQuestion(draft._id, payload);
        setQuestions((prev) =>
          prev.map((q) => (q._id === draft._id ? { ...q, ...payload } : q))
        );
      }
      setDraft(null);
      const refreshed = await client.findQuizById(qid);
      setQuiz(refreshed);
    } catch {
      setError("Failed to save question.");
    } finally {
      setSaving(false);
    }
  };

  const deleteDraftQuestion = async () => {
    if (!draft || draft._isNew) {
      setDraft(null);
      return;
    }
    if (!window.confirm("Delete this question?")) return;
    try {
      await client.deleteQuestion(draft._id);
      setQuestions((prev) => prev.filter((q) => q._id !== draft._id));
      setDraft(null);
      const refreshed = await client.findQuizById(qid);
      setQuiz(refreshed);
    } catch {
      setError("Failed to delete question.");
    }
  };

  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 my-4">
        <Spinner animation="border" size="sm" />
        <span>Loading quiz...</span>
      </div>
    );
  }

  if (!quiz) {
    return <Alert variant="danger">Quiz not found.</Alert>;
  }

  return (
    <div id="wd-quiz-editor" className="mt-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="mb-0">
          {quiz.title || "Untitled Quiz"}{" "}
          <small className="text-muted">({quiz.points ?? 0} pts)</small>
        </h3>
        <div className="d-flex gap-2">
          <Link href={`/courses/${cid}/quizzes/${qid}`}>
            <Button variant="outline-secondary">Preview</Button>
          </Link>
          <Link href={`/courses/${cid}/quizzes`}>
            <Button variant="outline-secondary">Back to Quizzes</Button>
          </Link>
        </div>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Tabs defaultActiveKey="details" className="mb-3">
        <Tab eventKey="details" title="Details">
          <Row className="g-3">
            <Col md={8}>
              <Form.Group className="mb-3">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={quiz.title || ""}
                  onChange={(e) => updateField({ title: e.target.value })}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Description / Instructions</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={quiz.description || ""}
                  onChange={(e) =>
                    updateField({ description: e.target.value })
                  }
                />
              </Form.Group>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Quiz Type</Form.Label>
                    <Form.Select
                      value={quiz.quizType || "GRADED_QUIZ"}
                      onChange={(e) =>
                        updateField({ quizType: e.target.value })
                      }
                    >
                      <option value="GRADED_QUIZ">Graded Quiz</option>
                      <option value="PRACTICE_QUIZ">Practice Quiz</option>
                      <option value="GRADED_SURVEY">Graded Survey</option>
                      <option value="UNGRADED_SURVEY">Ungraded Survey</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Assignment Group</Form.Label>
                    <Form.Select
                      value={quiz.assignmentGroup || "QUIZZES"}
                      onChange={(e) =>
                        updateField({ assignmentGroup: e.target.value })
                      }
                    >
                      <option value="QUIZZES">Quizzes</option>
                      <option value="EXAMS">Exams</option>
                      <option value="ASSIGNMENTS">Assignments</option>
                      <option value="PROJECT">Project</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Due date</Form.Label>
                    <Form.Control
                      type="date"
                      value={quiz.dueDate || ""}
                      onChange={(e) =>
                        updateField({ dueDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Available from</Form.Label>
                    <Form.Control
                      type="date"
                      value={quiz.availableDate || ""}
                      onChange={(e) =>
                        updateField({ availableDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Until</Form.Label>
                    <Form.Control
                      type="date"
                      value={quiz.untilDate || ""}
                      onChange={(e) =>
                        updateField({ untilDate: e.target.value })
                      }
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>

            <Col md={4}>
              <Card>
                <Card.Body>
                  <Form.Group className="mb-3">
                    <Form.Label>Time limit (minutes)</Form.Label>
                    <Form.Control
                      type="number"
                      min={0}
                      value={quiz.timeLimit ?? 20}
                      onChange={(e) =>
                        updateField({
                          timeLimit: Number(e.target.value) || 0,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Check
                    className="mb-2"
                    type="switch"
                    id="multipleAttempts"
                    label="Allow multiple attempts"
                    checked={!!quiz.multipleAttempts}
                    onChange={(e) =>
                      updateField({ multipleAttempts: e.target.checked })
                    }
                  />

                  {quiz.multipleAttempts && (
                    <Form.Group className="mb-3">
                      <Form.Label>How many attempts</Form.Label>
                      <Form.Control
                        type="number"
                        min={1}
                        value={quiz.howManyAttempts ?? 1}
                        onChange={(e) =>
                          updateField({
                            howManyAttempts: Number(e.target.value) || 1,
                          })
                        }
                      />
                    </Form.Group>
                  )}

                  <Form.Check
                    className="mb-2"
                    type="switch"
                    id="shuffleAnswers"
                    label="Shuffle answers"
                    checked={!!quiz.shuffleAnswers}
                    onChange={(e) =>
                      updateField({ shuffleAnswers: e.target.checked })
                    }
                  />

                  <Form.Check
                    className="mb-2"
                    type="switch"
                    id="oneAtATime"
                    label="One question at a time"
                    checked={!!quiz.oneQuestionAtATime}
                    onChange={(e) =>
                      updateField({ oneQuestionAtATime: e.target.checked })
                    }
                  />

                  <Form.Check
                    className="mb-2"
                    type="switch"
                    id="webcam"
                    label="Webcam required"
                    checked={!!quiz.webcamRequired}
                    onChange={(e) =>
                      updateField({ webcamRequired: e.target.checked })
                    }
                  />

                  <Form.Check
                    className="mb-3"
                    type="switch"
                    id="lockAfter"
                    label="Lock questions after answering"
                    checked={!!quiz.lockQuestionsAfterAnswering}
                    onChange={(e) =>
                      updateField({
                        lockQuestionsAfterAnswering: e.target.checked,
                      })
                    }
                  />

                  <Form.Group className="mb-3">
                    <Form.Label>Access code</Form.Label>
                    <Form.Control
                      value={quiz.accessCode || ""}
                      onChange={(e) =>
                        updateField({ accessCode: e.target.value })
                      }
                    />
                  </Form.Group>

                  <Form.Group className="mb-0">
                    <Form.Label>Show correct answers</Form.Label>
                    <Form.Select
                      value={quiz.showCorrectAnswers || "immediately"}
                      onChange={(e) =>
                        updateField({ showCorrectAnswers: e.target.value })
                      }
                    >
                      <option value="immediately">Immediately</option>
                      <option value="after_due">After due date</option>
                      <option value="never">Never</option>
                    </Form.Select>
                  </Form.Group>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-3">
            <Button variant="secondary" onClick={saveDetails} disabled={saving}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button variant="primary" onClick={saveAndReturn} disabled={saving}>
              Save &amp; Return
            </Button>
          </div>
        </Tab>

        <Tab eventKey="questions" title={`Questions (${questions.length})`}>
          <div className="d-flex gap-2 mb-3">
            <Button
              variant="primary"
              onClick={() => startNewQuestion("MULTIPLE_CHOICE")}
            >
              <FaPlus className="me-1" /> Multiple Choice
            </Button>
            <Button
              variant="primary"
              onClick={() => startNewQuestion("TRUE_FALSE")}
            >
              <FaPlus className="me-1" /> True/False
            </Button>
            <Button
              variant="primary"
              onClick={() => startNewQuestion("FILL_IN_BLANK")}
            >
              <FaPlus className="me-1" /> Fill in the Blank
            </Button>
          </div>

          {draft && (
            <QuestionEditor
              question={draft}
              onChange={(q) => setDraft({ ...draft, ...q })}
              onSave={saveDraft}
              onCancel={() => setDraft(null)}
              onDelete={deleteDraftQuestion}
              saving={saving}
            />
          )}

          <ListGroup>
            {questions.length === 0 && !draft && (
              <div className="text-muted">No questions yet.</div>
            )}
            {questions.map((q, i) => (
              <ListGroup.Item
                key={q._id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <div className="fw-bold">
                    {i + 1}. {q.title}{" "}
                    <span className="text-muted small">
                      ({questionTypeLabel(q.type)} · {q.points} pts)
                    </span>
                  </div>
                  <div className="text-muted small">{q.question}</div>
                </div>
                <Button
                  variant="outline-secondary"
                  size="sm"
                  onClick={() => startEdit(q)}
                >
                  Edit
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Tab>
      </Tabs>
    </div>
  );
}

function questionTypeLabel(type: QuestionType) {
  if (type === "MULTIPLE_CHOICE") return "Multiple Choice";
  if (type === "TRUE_FALSE") return "True/False";
  return "Fill in the Blank";
}
