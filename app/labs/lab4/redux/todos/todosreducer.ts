import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ],
  todo: { id: "-1", title: "" },
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todo = action.payload;
    },
    addTodo: (state, action) => {
      const newTodo = {
        ...action.payload,
        id: new Date().getTime().toString(),
      };
      state.todos.push(newTodo);
      state.todo = { id: "-1", title: "" };
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((t: any) =>
        t.id === action.payload.id ? action.payload : t
      );
      state.todo = { id: "-1", title: "" };
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((t: any) => t.id !== action.payload);
    },
  },
});

export const { setTodo, addTodo, updateTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;