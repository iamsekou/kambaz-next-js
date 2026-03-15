"use client";

import { useParams, useRouter } from "next/navigation";
import { Button, FormControl, FormLabel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { addAssignment, updateAssignment } from "../reducer";
import { useState } from "react";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { assignments } = useSelector(
    (state: RootState) => state.assignmentReducer
  );

  const existingAssignment =
    aid === "new"
      ? null
      : assignments.find((a: any) => a._id === aid);

  const [assignment, setAssignment] = useState<any>(
    existingAssignment || {
      _id: "new",
      course: cid,
      title: "New Assignment",
      description: "New Assignment Description",
      points: 100,
      dueDate: "",
      availableFromDate: "",
      availableUntilDate: "",
    }
  );

  const save = () => {
    if (aid === "new") {
      dispatch(addAssignment(assignment));
    } else {
      dispatch(updateAssignment(assignment));
    }
    router.push(`/courses/${cid}/assignments`);
  };

  const cancel = () => {
    router.push(`/courses/${cid}/assignments`);
  };

  return (
    <div className="w-75">
      <FormLabel>Assignment Name</FormLabel>
      <FormControl
        className="mb-3"
        value={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />

      <FormLabel>Description</FormLabel>
      <FormControl
        as="textarea"
        rows={4}
        className="mb-3"
        value={assignment.description}
        onChange={(e) =>
          setAssignment({ ...assignment, description: e.target.value })
        }
      />

      <FormLabel>Points</FormLabel>
      <FormControl
        className="mb-3"
        value={assignment.points}
        onChange={(e) =>
          setAssignment({ ...assignment, points: e.target.value })
        }
      />

      <FormLabel>Due Date</FormLabel>
      <FormControl
        type="date"
        className="mb-3"
        value={assignment.dueDate}
        onChange={(e) =>
          setAssignment({ ...assignment, dueDate: e.target.value })
        }
      />

      <FormLabel>Available From</FormLabel>
      <FormControl
        type="date"
        className="mb-3"
        value={assignment.availableFromDate}
        onChange={(e) =>
          setAssignment({
            ...assignment,
            availableFromDate: e.target.value,
          })
        }
      />

      <FormLabel>Available Until</FormLabel>
      <FormControl
        type="date"
        className="mb-4"
        value={assignment.availableUntilDate}
        onChange={(e) =>
          setAssignment({
            ...assignment,
            availableUntilDate: e.target.value,
          })
        }
      />

      <div className="text-end">
        <Button variant="secondary" className="me-2" onClick={cancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={save}>
          Save
        </Button>
      </div>
    </div>
  );
}