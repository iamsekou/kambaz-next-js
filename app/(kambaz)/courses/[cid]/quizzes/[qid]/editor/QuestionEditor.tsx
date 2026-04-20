"use client";

import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Question, QuestionType } from "../../utils";

type Props = {
  question: Question;
  onChange: (q: Question) => void;
  onSave: () => void;
  onCancel: () => void;
  onDelete: () => void;
  saving?: boolean;
};

export default function QuestionEditor({
  question,
  onChange,
  onSave,
  onCancel,
  onDelete,
  saving,
}: Props) {
  const update = (patch: Partial<Question>) =>
    onChange({ ...question, ...patch });

  const changeType = (type: QuestionType) => {
    if (type === "MULTIPLE_CHOICE") {
      update({
        type,
        choices: question.choices?.length
          ? question.choices
          : [
              { text: "", isCorrect: true },
              { text: "", isCorrect: false },
            ],
      });
    } else if (type === "TRUE_FALSE") {
      update({ type, correctAnswer: question.correctAnswer || "true" });
    } else {
      update({
        type,
        correctAnswers: question.correctAnswers?.length
          ? question.correctAnswers
          : [""],
      });
    }
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <div className="d-flex gap-2 mb-3">
          <Form.Control
            placeholder="Question title"
            value={question.title}
            onChange={(e) => update({ title: e.target.value })}
          />
          <Form.Select
            style={{ maxWidth: 200 }}
            value={question.type}
            onChange={(e) => changeType(e.target.value as QuestionType)}
          >
            <option value="MULTIPLE_CHOICE">Multiple Choice</option>
            <option value="TRUE_FALSE">True / False</option>
            <option value="FILL_IN_BLANK">Fill in the Blank</option>
          </Form.Select>
          <InputGroup style={{ maxWidth: 140 }}>
            <InputGroup.Text>pts</InputGroup.Text>
            <Form.Control
              type="number"
              min={0}
              value={question.points}
              onChange={(e) =>
                update({ points: Number(e.target.value) || 0 })
              }
            />
          </InputGroup>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>Question</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={question.question}
            onChange={(e) => update({ question: e.target.value })}
          />
        </Form.Group>

        {question.type === "MULTIPLE_CHOICE" && (
          <Form.Group className="mb-3">
            <Form.Label>Choices (select the correct one)</Form.Label>
            {(question.choices || []).map((choice, i) => (
              <div key={i} className="d-flex gap-2 mb-2 align-items-center">
                <Form.Check
                  type="radio"
                  name={`correct-${question._id || "new"}`}
                  checked={!!choice.isCorrect}
                  onChange={() =>
                    update({
                      choices: (question.choices || []).map((c, j) => ({
                        ...c,
                        isCorrect: j === i,
                      })),
                    })
                  }
                />
                <Form.Control
                  value={choice.text}
                  placeholder={`Choice ${i + 1}`}
                  onChange={(e) =>
                    update({
                      choices: (question.choices || []).map((c, j) =>
                        j === i ? { ...c, text: e.target.value } : c
                      ),
                    })
                  }
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    update({
                      choices: (question.choices || []).filter(
                        (_, j) => j !== i
                      ),
                    })
                  }
                  disabled={(question.choices || []).length <= 2}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() =>
                update({
                  choices: [
                    ...(question.choices || []),
                    { text: "", isCorrect: false },
                  ],
                })
              }
            >
              <FaPlus className="me-1" />
              Add choice
            </Button>
          </Form.Group>
        )}

        {question.type === "TRUE_FALSE" && (
          <Form.Group className="mb-3">
            <Form.Label>Correct answer</Form.Label>
            <div className="d-flex gap-3">
              <Form.Check
                type="radio"
                id={`tf-true-${question._id || "new"}`}
                name={`tf-${question._id || "new"}`}
                label="True"
                checked={question.correctAnswer === "true"}
                onChange={() => update({ correctAnswer: "true" })}
              />
              <Form.Check
                type="radio"
                id={`tf-false-${question._id || "new"}`}
                name={`tf-${question._id || "new"}`}
                label="False"
                checked={question.correctAnswer === "false"}
                onChange={() => update({ correctAnswer: "false" })}
              />
            </div>
          </Form.Group>
        )}

        {question.type === "FILL_IN_BLANK" && (
          <Form.Group className="mb-3">
            <Form.Label>
              Accepted answers (case-insensitive; add all valid variants)
            </Form.Label>
            {(question.correctAnswers || []).map((ans, i) => (
              <div key={i} className="d-flex gap-2 mb-2">
                <Form.Control
                  value={ans}
                  placeholder={`Answer ${i + 1}`}
                  onChange={(e) =>
                    update({
                      correctAnswers: (question.correctAnswers || []).map(
                        (a, j) => (j === i ? e.target.value : a)
                      ),
                    })
                  }
                />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() =>
                    update({
                      correctAnswers: (question.correctAnswers || []).filter(
                        (_, j) => j !== i
                      ),
                    })
                  }
                  disabled={(question.correctAnswers || []).length <= 1}
                >
                  <FaTrash />
                </Button>
              </div>
            ))}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() =>
                update({
                  correctAnswers: [...(question.correctAnswers || []), ""],
                })
              }
            >
              <FaPlus className="me-1" />
              Add answer
            </Button>
          </Form.Group>
        )}

        <div className="d-flex justify-content-end gap-2">
          {question._id && (
            <Button variant="outline-danger" onClick={onDelete}>
              Delete
            </Button>
          )}
          <Button variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave} disabled={saving}>
            {saving ? "Saving..." : "Save Question"}
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
