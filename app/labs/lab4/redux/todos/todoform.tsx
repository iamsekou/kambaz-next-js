import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

interface TodoFormProps {
  todo: { id: string; title: string; };
  setTodo: React.Dispatch<React.SetStateAction<{ id: string; title: string; }>>;
  onSubmit: (newTodo: { title: string }) => void;
  onUpdate: (updatedTodo: { id: string; title: string }) => void;
}

export default function TodoForm({ todo, setTodo, onSubmit, onUpdate }: TodoFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo.title.trim()) {
      if (todo.id) {
        onUpdate(todo);
      } else {
        onSubmit({ title: todo.title });
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Form.Control
          type="text"
          value={todo.title}
          onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          placeholder="Add or update todo"
        />
        <Button type="submit" variant="primary">
          {todo.id ? "Update" : "Add"}
        </Button>
      </InputGroup>
    </Form>
  );
}