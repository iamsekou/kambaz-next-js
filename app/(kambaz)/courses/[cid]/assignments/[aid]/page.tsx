import Link from "next/link";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">

      {/* Assignment Name */}
      <label htmlFor="wd-name">Assignment Name</label><br />
      <input
        id="wd-name"
        defaultValue="A1 - ENV + HTML"
      />
      <br /><br />

      {/* Description */}
      <label htmlFor="wd-description">Description</label><br />
      <textarea
        id="wd-description"
        rows={5}
        cols={60}
      >
The assignment is available online.
Submit a link to the landing page of your Web application running on Netlify.
Your full name and section should be included in the following:
Links to each of the lab assignments
Link to the Kambaz application
Links to all relevant source code repositories
      </textarea>

      <br /><br />

      <table>
        <tbody>

          {/* Points */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          {/* Assignment Group */}
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

          {/* Submission Type */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type">
                <option>Online</option>
              </select>
              <br /><br />

              <input type="checkbox" id="wd-text-entry" />
              <label htmlFor="wd-text-entry">Text Entry</label><br />

              <input type="checkbox" id="wd-website-url" defaultChecked />
              <label htmlFor="wd-website-url">Website URL</label><br />

              <input type="checkbox" id="wd-media-recordings" />
              <label htmlFor="wd-media-recordings">Media Recordings</label><br />

              <input type="checkbox" id="wd-student-annotation" />
              <label htmlFor="wd-student-annotation">Student Annotation</label><br />

              <input type="checkbox" id="wd-file-upload" />
              <label htmlFor="wd-file-upload">File Uploads</label>
            </td>
          </tr>

          {/* Assign / Dates */}
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              <label htmlFor="wd-assign-to">Assign to</label><br />
              <input id="wd-assign-to" defaultValue="Everyone" />
              <br /><br />

              <label htmlFor="wd-due">Due</label><br />
              <input id="wd-due" type="date" defaultValue="2024-05-13" />
              <br /><br />

              <label htmlFor="wd-available-from">Available from</label><br />
              <input id="wd-available-from" type="date" defaultValue="2024-05-06" />
              <br /><br />

              <label htmlFor="wd-available-until">Until</label><br />
              <input id="wd-available-until" type="date" defaultValue="2024-05-20" />
            </td>
          </tr>

        </tbody>
      </table>

      <br />

      {/* Action Buttons */}
      <Link href="/courses/1234/assignments">
        <button>Cancel</button>
      </Link>
      <Link href="/courses/1234/assignments">
        <button>Save</button>
      </Link>

    </div>
  );
}
