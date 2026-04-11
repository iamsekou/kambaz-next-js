"use client";

import { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import PeopleTable from "../../courses/[cid]/people/Table";
import * as client from "../client";

export default function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");

  // Fetch all users from the server
  const fetchUsers = async () => {
    const allUsers = await client.findAllUsers();
    setUsers(allUsers);
  };

  // Filter users by role; if role is empty, fetch all
  const filterUsersByRole = async (role: string) => {
    setRole(role);
    if (role) {
      const filtered = await client.findUsersByRole(role);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  // Filter users by partial name; if name is empty, fetch all
  const filterUsersByName = async (name: string) => {
    setName(name);
    if (name) {
      const filtered = await client.findUsersByPartialName(name);
      setUsers(filtered);
    } else {
      fetchUsers();
    }
  };

  // Create a new user with default values
  const createUser = async () => {
    const user = await client.createUser({
      firstName: "New",
      lastName: `User${users.length + 1}`,
      username: `newuser${Date.now()}`,
      password: "password123",
      email: `email${users.length + 1}@neu.edu`,
      section: "S101",
      role: "STUDENT",
    });
    setUsers([...users, user]);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h3>Users</h3>

      {/* + People button */}
      <button
        onClick={createUser}
        className="float-end btn btn-danger wd-add-people"
      >
        <FaPlus className="me-2" />
        Users
      </button>

      {/* Name search input */}
      <FormControl
        onChange={(e) => filterUsersByName(e.target.value)}
        placeholder="Search people"
        className="float-start w-25 me-2 wd-filter-by-name"
      />

      {/* Role filter dropdown */}
      <select
        value={role}
        onChange={(e) => filterUsersByRole(e.target.value)}
        className="form-select float-start w-25 wd-select-role"
      >
        <option value="">All Roles</option>
        <option value="STUDENT">Students</option>
        <option value="FACULTY">Faculty</option>
        <option value="TA">Assistants</option>
        <option value="ADMIN">Administrators</option>
      </select>

      <div style={{ clear: "both" }} />

      {/* People table */}
      <PeopleTable users={users} fetchUsers={fetchUsers} />
    </div>
  );
}
