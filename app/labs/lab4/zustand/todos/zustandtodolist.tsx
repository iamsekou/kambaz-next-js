"use client";

import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { usetodostore } from "./usetodostore";

export default function zustandtodolist() {
  const { todos, todo, settodo, addtodo, updatetodo, deletetodo } =
    usetodostore();

  return (
    <div>
      <h2>todo list</h2>

      <ListGroup>
        <ListGroupItem>
          <FormControl
            value={todo.title}
            onChange={(e) =>
              settodo({ ...todo, title: e.target.value })
            }
          />

          <Button className="btn-warning m-2" onClick={() => updatetodo()}>
            update
          </Button>

          <Button className="btn-success m-2" onClick={() => addtodo()}>
            add
          </Button>
        </ListGroupItem>

        {todos.map((t) => (
          <ListGroupItem key={t.id}>
            {t.title}

            <Button
              className="btn-primary m-2"
              onClick={() => settodo(t)}>
              edit
            </Button>

            <Button
              className="btn-danger m-2"
              onClick={() => deletetodo(t.id)}>
              delete
            </Button>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}