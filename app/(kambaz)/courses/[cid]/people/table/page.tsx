"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../client";

export default function People() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };

  const [people, setPeople] = useState<any[]>([]);
  const [newUser, setNewUser] = useState<any>({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "STUDENT",
  });

  const isFaculty = currentUser?.role === "FACULTY";

  const fetchPeople = async () => {
    const users = await client.findUsersForCourse(cid as string);
    setPeople(users);
  };

  const createUser = async () => {
    const created = await client.createUserForCourse(cid as string, newUser);
    setPeople([...people, created]);
    setNewUser({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "STUDENT",
    });
  };

  const saveUser = async (user: any) => {
    const updated = await client.updatePerson(user);
    setPeople(people.map((p) => (p._id === updated._id ? updated : p)));
  };

  const removeUser = async (userId: string) => {
    await client.deletePerson(userId);
    setPeople(people.filter((p) => p._id !== userId));
  };

  useEffect(() => {
    fetchPeople();
  }, [cid]);

  return (
    <div id="wd-people">
      <h2>People</h2>

      {isFaculty && (
        <div className="mb-4">
          <FormControl
            className="mb-2"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) =>
              setNewUser({ ...newUser, username: e.target.value })
            }
          />
          <FormControl
            className="mb-2"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
          />
          <FormControl
            className="mb-2"
            placeholder="First Name"
            value={newUser.firstName}
            onChange={(e) =>
              setNewUser({ ...newUser, firstName: e.target.value })
            }
          />
          <FormControl
            className="mb-2"
            placeholder="Last Name"
            value={newUser.lastName}
            onChange={(e) =>
              setNewUser({ ...newUser, lastName: e.target.value })
            }
          />
          <FormControl
            className="mb-2"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) =>
              setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <Button variant="danger" onClick={createUser}>
            Add User
          </Button>
        </div>
      )}

      <ListGroup>
        {people.map((person: any) => (
          <ListGroup.Item key={person._id}>
            {isFaculty ? (
              <>
                <FormControl
                  className="mb-2"
                  value={person.firstName || ""}
                  onChange={(e) =>
                    setPeople(
                      people.map((p) =>
                        p._id === person._id
                          ? { ...p, firstName: e.target.value }
                          : p
                      )
                    )
                  }
                />
                <FormControl
                  className="mb-2"
                  value={person.lastName || ""}
                  onChange={(e) =>
                    setPeople(
                      people.map((p) =>
                        p._id === person._id
                          ? { ...p, lastName: e.target.value }
                          : p
                      )
                    )
                  }
                />
                <FormControl
                  className="mb-2"
                  value={person.email || ""}
                  onChange={(e) =>
                    setPeople(
                      people.map((p) =>
                        p._id === person._id
                          ? { ...p, email: e.target.value }
                          : p
                      )
                    )
                  }
                />
                <Button
                  className="me-2"
                  variant="warning"
                  onClick={() => saveUser(person)}
                >
                  Save
                </Button>
                <Button
                  variant="danger"
                  onClick={() => removeUser(person._id)}
                >
                  Delete
                </Button>
              </>
            ) : (
              <div>
                {person.firstName} {person.lastName} — {person.email}
              </div>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}