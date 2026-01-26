import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <input
        id="wd-search-assignment"
        placeholder="Search for Assignments"
      />

      <button id="wd-add-assignment-group">+ Group</button>
      <button id="wd-add-assignment">+ Assignment</button>

      <h3 id="wd-assignments-title">
        ASSIGNMENTS 40% of Total <button>+</button>
      </h3>

      <ul id="wd-assignment-list">

        {/* Assignment 1 */}
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/123"
            className="wd-assignment-link"
          >
            A1 - ENV + HTML
          </Link>
          <div className="wd-assignment-info">
            Multiple Modules | Not available until Feb 2 at 12:00am | Due on Feb 9 at 11:59pm | 100 pts
          </div>
        </li>

        {/* Assignment 2 */}
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/234"
            className="wd-assignment-link"
          >
            A2 - CSS + BOOTSTRAP
          </Link>
          <div className="wd-assignment-info">
            Multiple Modules | Not available until Feb 9 at 12:00am | Due on Feb 16 at 11:59pm | 100 pts
          </div>
        </li>

        {/* Assignment 3 */}
        <li className="wd-assignment-list-item">
          <Link
            href="/courses/1234/assignments/345"
            className="wd-assignment-link"
          >
            A3 - JS + DOM
          </Link>
          <div className="wd-assignment-info">
            Multiple Modules | Not available until Feb 16 at 12:00am | Due on Feb 23 at 11:59pm | 100 pts
          </div>
        </li>

      </ul>
    </div>
  );
}
