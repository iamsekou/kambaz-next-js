"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

export type Todo = {
  id: string;
  title: string;
};

type TodosContextType = {
  todos: Todo[];
  addTodo: (title: string) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: string) => void;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" }
  ]);

  const addTodo = (title: string) => {
    const newTodo: Todo = {
      id: new Date().getTime().toString(),
      title,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const updateTodo = (updated: Todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  return React.createElement(
    TodosContext.Provider,
    { value: { todos, addTodo, updateTodo, deleteTodo } },
    children
  );
}

export function useTodos() {
  const ctx = useContext(TodosContext);
  if (!ctx) throw new Error("useTodos must be used within TodosProvider");
  return ctx;
}