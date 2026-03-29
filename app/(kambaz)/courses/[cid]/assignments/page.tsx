"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useParams } from "next/navigation";
import { Button, FormControl, ListGroup } from "react-bootstrap";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { deleteAssignment, setAssignments } from "./reducer";
import * as client from "../../client";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };

  const fetchAssignments = async () => {
    const assignments = await client.findAssignmentsForCourse(cid as string);
    dispatch(setAssignments(assignments));
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const removeAssignment = async (assignmentId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to remove this assignment?"
    );
    if (!confirmed) return;

    await client.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div id="wd-assignments">
      <div className="d-flex mb-3">
        <FormControl placeholder="Search for Assignment" className="me-2" />
        <Button variant="secondary" className="me-2">
          + Group
        </Button>

        {currentUser?.role === "FACULTY" && (
          <Link href={`/courses/${cid}/assignments/new`}>
            <Button variant="danger">
              <FaPlus className="me-1" />
              Assignment
            </Button>
          </Link>
        )}
      </div>

      <ListGroup>
        {assignments.map((assignment: any) => (
          <ListGroup.Item
            key={assignment._id}
            className="d-flex justify-content-between align-items-start"
          >
            <div>
              <Link
                href={`/courses/${cid}/assignments/${assignment._id}`}
                className="text-decoration-none fw-bold"
              >
                {assignment.title}
              </Link>
              <div className="text-muted">{assignment.description}</div>
              <div className="text-muted">{assignment.points} pts</div>
            </div>

            {currentUser?.role === "FACULTY" && (
              <Button
                variant="danger"
                onClick={() => removeAssignment(assignment._id)}
              >
                <FaTrash className="me-1" />
                Delete
              </Button>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}