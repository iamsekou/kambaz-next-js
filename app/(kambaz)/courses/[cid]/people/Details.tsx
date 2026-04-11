"use client";

import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { FaPencil, FaCheck } from "react-icons/fa6";
import { useParams } from "next/navigation";
import Link from "next/link";
import { FormControl } from "react-bootstrap";
import * as client from "../../../account/client";

export default function PeopleDetails({
  uid,
  onClose,
  fetchUsers,
}: {
  uid: string | null;
  onClose: () => void;
  fetchUsers: () => void;
}) {
  const [user, setUser] = useState<any>({});
  const [name, setName] = useState("");           // to edit the user's first and last name
  const [editing, setEditing] = useState(false);  // whether we are editing or not

  const fetchUser = async () => {
    if (!uid) return;
    const u = await client.findUserById(uid);
    setUser(u);
  };

  useEffect(() => {
    if (uid) fetchUser();
  }, [uid]);

  if (!uid) return null;

  // Split the name into first and last, create updated user, send to server
  const saveUser = async () => {
    const [firstName, lastName] = name.split(" ");
    const updatedUser = { ...user, firstName, lastName };
    await client.updateUser(updatedUser);
    setUser(updatedUser);
    setEditing(false);
    onClose();
  };

  const deleteUser = async (userId: string) => {
    await client.deleteUser(userId);
    onClose();
    fetchUsers();
  };

  return (
    <div className="wd-people-details position-fixed top-0 end-0 bottom-0 bg-white p-4 shadow w-25">
      {/* Close button */}
      <button onClick={onClose} className="btn position-fixed top-0 end-0 wd-close-details">
        <IoCloseSharp className="fs-1" />
      </button>

      <div className="text-center text-secondary me-2 fs-1">
        <FaUserCircle />
      </div>
      <hr />

      {/* Name — pencil to edit, check to save */}
      <div className="text-danger fs-4 wd-name">
        {!editing && (
          <FaPencil
            onClick={() => {
              setEditing(true);
              setName(`${user.firstName} ${user.lastName}`);
            }}
            className="float-end fs-5 mt-2 wd-edit"
          />
        )}
        {editing && (
          <FaCheck
            onClick={saveUser}
            className="float-end fs-5 mt-2 me-2 wd-save"
          />
        )}
        {!editing && (
          <div
            className="wd-name"
            onClick={() => {
              setEditing(true);
              setName(`${user.firstName} ${user.lastName}`);
            }}
          >
            {user.firstName} {user.lastName}
          </div>
        )}
        {user && editing && (
          <FormControl
            className="w-50 wd-edit-name"
            defaultValue={`${user.firstName} ${user.lastName}`}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                saveUser();
              }
            }}
          />
        )}
      </div>

      {/* Details */}
      <b>Roles:</b>{" "}
      <span className="wd-roles">{user.role}</span> <br />
      <b>Login ID:</b>{" "}
      <span className="wd-login-id">{user.loginId}</span> <br />
      <b>Section:</b>{" "}
      <span className="wd-section">{user.section}</span> <br />
      <b>Total Activity:</b>{" "}
      <span className="wd-total-activity">{user.totalActivity}</span>

      <hr />

      {/* Delete / Cancel buttons */}
      <button
        onClick={() => deleteUser(uid)}
        className="btn btn-danger float-end wd-delete"
      >
        Delete
      </button>
      <button
        onClick={onClose}
        className="btn btn-secondary float-end me-2 wd-cancel"
      >
        Cancel
      </button>
    </div>
  );
}
