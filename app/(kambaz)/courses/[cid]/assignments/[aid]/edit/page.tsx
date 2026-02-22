"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import * as db from "../../../../../database";

export default function AssignmentEditor() {
  const { cid, aid } = useParams<{ cid: string; aid: string }>();

  const assignment = db.assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  // Fallbacks so it doesn’t crash if something is missing
  const title = assignment?.title ?? "";
  const description = assignment?.description ?? "";
  const points = assignment?.points ?? 100;

  // These are string representations from the database
  const due = assignment?.due ?? "Due May 13 at 11:59pm";
  const available = assignment?.available ?? "Not available until May 6 at 12:00am";

  return (
    <div id="wd-assignments-editor">
      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" defaultValue={title} />
      <br />
      <br />

      {/* Description */}
      <label htmlFor="wd-description">Description</label>
      <br />
      <textarea id="wd-description" rows={5} cols={60} defaultValue={description} />
      <br />
      <br />

      <table>
        <tbody>
          {/* Points */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={points} />
            </td>
          </tr>

          {/* Assignment Group (keep as earlier chapters) */}
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

          {/* Display Grade */}
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

          {/* Submission Type (keep as earlier chapters) */}
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

          {/* Assign / Dates (now data-driven) */}
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
              <input id="wd-due" type="text" defaultValue={due} />
              <br />
              <br />

              <label htmlFor="wd-available-from">Available from</label>
              <br />
              <input
                id="wd-available-from"
                type="text"
                defaultValue={available}
              />
              <br />
              <br />

              <label htmlFor="wd-available-until">Until</label>
              <br />
              <input
                id="wd-available-until"
                type="text"
                defaultValue={available}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <br />

      {/* Action Buttons (must go back to the current course’s assignments screen) */}
      <Link href={`/courses/${cid}/assignments`}>
        <button id="wd-cancel">Cancel</button>
      </Link>
      <Link href={`/courses/${cid}/assignments`}>
        <button id="wd-save">Save</button>
      </Link>
    </div>
  );
}
