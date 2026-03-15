import { ListGroup } from "react-bootstrap";
import TodoForm from "./todoform";
import TodoItem from "./todoitem";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { addTodo, updateTodo } from "./todosreducer";
import { useState } from "react";

export default function TodoList() {
  const { todos } = useSelector((state: RootState) => state.todosReducer as { todos: any[] });
  const dispatch = useDispatch();
  const [todo, setTodo] = useState({ id: "", title: "" });

  const handleAddTodo = (newTodo: any) => {
    dispatch(addTodo({ ...newTodo, id: Date.now().toString() })); // Generate ID if needed
    setTodo({ id: "", title: "" }); // Reset form
  };

  const handleUpdateTodo = (updatedTodo: any) => {
    dispatch(updateTodo(updatedTodo));
    setTodo({ id: "", title: "" }); // Reset form
  };

  return (
    <div id="wd-todo-list-redux">
      <h2>Todo List</h2>
      <ListGroup>
        <TodoForm
          todo={todo}
          setTodo={setTodo}
          onSubmit={handleAddTodo}
          onUpdate={handleUpdateTodo}
        />
        {todos.map((todo: any) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            setTodo={setTodo}
            deleteTodo={(id: string) => dispatch({ type: "todos/deleteTodo", payload: id })}
          />
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}