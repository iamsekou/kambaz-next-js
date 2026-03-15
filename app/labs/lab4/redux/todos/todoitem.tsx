import React from "react";
import { Dispatch, SetStateAction } from "react";

// Update the props interface to include setTodo and deleteTodo
interface TodoItemProps {
  todo: any;
  setTodo: Dispatch<SetStateAction<{ id: string; title: string; }>>;
  deleteTodo: (id: string) => { type: string; payload: string; };
}

export default function TodoItem({ todo, setTodo, deleteTodo }: TodoItemProps) {
  const handleEdit = () => {
    setTodo(todo); // Populate the form with the current todo for editing
  };

  const handleDelete = () => {
    deleteTodo(todo.id); // Dispatch delete action
  };

  return (
    <div>
      <button onClick={handleEdit}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
      {todo.title}
    </div>
  );
}