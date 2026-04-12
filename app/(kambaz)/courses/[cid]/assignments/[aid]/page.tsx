"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import * as client from "../../../../courses/client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();
  const router = useRouter();

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };

  const isFaculty = currentUser?.role === "FACULTY";

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: 100,
    due: "",
    availableFrom: "",
    availableUntil: "",
    course: cid,
  });

  const fetchAssignment = async () => {
    if (aid === "new") return;
    const fetched = await client.findAssignmentById(aid);
    setAssignment(fetched);
  };

  useEffect(() => {
    fetchAssignment();
  }, [aid]);

  const saveAssignment = async () => {
    if (!isFaculty) return;
    if (aid === "new") {
      await client.createAssignmentForCourse(cid, assignment);
    } else {
      await client.updateAssignment(assignment);
    }
    router.push(`/courses/${cid}/assignments`);
  };

  // ── Read-only view for students / non-faculty ─────────────────────────────

  if (!isFaculty) {
    return (
      <div id="wd-assignments-editor">
        <h4>{assignment.title}</h4>
        <p>{assignment.description}</p>
        <table>
          <tbody>
            <tr>
              <td align="right" valign="top"><strong>Points:&nbsp;</strong></td>
              <td>{assignment.points}</td>
            </tr>
            {assignment.due && (
              <tr>
                <td align="right" valign="top"><strong>Due:&nbsp;</strong></td>
                <td>{assignment.due}</td>
              </tr>
            )}
            {assignment.availableFrom && (
              <tr>
                <td align="right" valign="top"><strong>Available from:&nbsp;</strong></td>
                <td>{assignment.availableFrom}</td>
              </tr>
            )}
            {assignment.availableUntil && (
              <tr>
                <td align="right" valign="top"><strong>Until:&nbsp;</strong></td>
                <td>{assignment.availableUntil}</td>
              </tr>
            )}
          </tbody>
        </table>
        <br />
        <Link href={`/courses/${cid}/assignments`}>
          <button id="wd-back">Back</button>
        </Link>
      </div>
    );
  }

  // ── Editable view for FACULTY ─────────────────────────────────────────────

  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input
        id="wd-name"
        value={assignment.title}
        onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
      />
      <br />
      <br />

      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea
        id="wd-description"
        rows={5}
        cols={60}
        value={assignment.description}
        onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
      />
      <br />
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input
                id="wd-points"
                type="number"
                value={assignment.points}
                onChange={(e) =>
                  setAssignment({ ...assignment, points: Number(e.target.value) })
                }
              />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group">
                <option>ASSIGNMENTS</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade">
                <option>Percentage</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option>Online</option>
              </select>
              <br />
              <br />
              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label>
              <br />
              <input type="checkbox" id="wd-website-url" defaultChecked />
              <label htmlFor="wd-website-url">Website URL</label>
              <br />
              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label>
              <br />
              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label>
              <br />
              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label>
              <br />
              <input id="wd-assign-to" defaultValue="Everyone" />
              <br />
              <br />

              <label htmlFor="wd-due">Due</label>
              <br />
              <input
                id="wd-due"
                type="datetime-local"
                value={assignment.due || ""}
                onChange={(e) => setAssignment({ ...assignment, due: e.target.value })}
              />
              <br />
              <br />

              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input
                id="wd-available-from"
                type="datetime-local"
                value={assignment.availableFrom || ""}
                onChange={(e) =>
                  setAssignment({ ...assignment, availableFrom: e.target.value })
                }
              />
              <br />
              <br />

              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                id="wd-available-until"
                type="datetime-local"
                value={assignment.availableUntil || ""}
                onChange={(e) =>
                  setAssignment({ ...assignment, availableUntil: e.target.value })
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      <Link href={`/courses/${cid}/assignments`}>
        <button id="wd-cancel">Cancel</button>
      </Link>

      <button id="wd-save" onClick={saveAssignment}>
        Save
      </button>
    </div>
  );
}
