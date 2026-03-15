"use client";

import { useState } from "react";
import { ListGroup, Button, Form, InputGroup } from "react-bootstrap";
import { useTodos, Todo } from "./todoscontext";

export default function ReactContextTodoList() {
  const { todos, addTodo, updateTodo, deleteTodo } = useTodos();
  const [current, setCurrent] = useState<Todo>({ id: "", title: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = current.title.trim();
    if (!title) return;

    if (current.id) {
      updateTodo({ ...current, title });
    } else {
      addTodo(title);
    }

    setCurrent({ id: "", title: "" });
  };

  const startEdit = (todo: Todo) => {
    setCurrent(todo);
  };

  return (
    <div id="wd-react-context-todos">
      <h2>Todo List (React Context)</h2>

      <Form onSubmit={handleSubmit} className="mb-3">
        <InputGroup>
          <Form.Control
            value={current.title}
            onChange={(e) => setCurrent({ ...current, title: e.target.value })}
            placeholder="Enter todo title"
          />
          <Button type="submit" variant="primary">
            {current.id ? "Update" : "Add"}
          </Button>
        </InputGroup>
      </Form>

      <ListGroup>
        {todos.map((todo) => (
          <ListGroup.Item key={todo.id} className="d-flex justify-content-between align-items-center">
            <span>{todo.title}</span>
            <div>
              <Button
                size="sm"
                variant="outline-secondary"
                className="me-2"
                onClick={() => startEdit(todo)}
              >
                Edit
              </Button>
              <Button size="sm" variant="outline-danger" onClick={() => deleteTodo(todo.id)}>
                Delete
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}