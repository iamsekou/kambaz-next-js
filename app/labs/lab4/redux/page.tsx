"use client";
import { Provider } from "react-redux";
import store from "../store";
import HelloRedux from "./hello";
import CounterRedux from "./counterredux";
import AddRedux from "./addredux";
import TodoList from "./todos/todolist";

export default function ReduxExamples() {
  return (
    <Provider store={store}>
      <div>
        <h2>Redux Examples</h2>
        <HelloRedux />
        <CounterRedux />
        <AddRedux />
        <TodoList />
      </div>
    </Provider>
  );
}
