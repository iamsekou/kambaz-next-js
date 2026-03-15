import { create } from "zustand";

export type todo = {
  id: string;
  title: string;
};

interface todostate {
  todos: todo[];
  todo: todo;
  settodo: (todo: todo) => void;
  addtodo: () => void;
  updatetodo: () => void;
  deletetodo: (id: string) => void;
}

export const usetodostore = create<todostate>((set) => ({
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "" },

  settodo: (todo) => set({ todo }),

  addtodo: () =>
    set((state) => ({
      todos: [
        ...state.todos,
        { ...state.todo, id: new Date().getTime().toString() },
      ],
      todo: { id: "-1", title: "" },
    })),

  updatetodo: () =>
    set((state) => ({
      todos: state.todos.map((t) =>
        t.id === state.todo.id ? state.todo : t
      ),
      todo: { id: "-1", title: "" },
    })),

  deletetodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));