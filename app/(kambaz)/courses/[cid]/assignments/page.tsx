// app/(kambaz)/courses/[cid]/assignments/page.tsx
import { FaSearch, FaPlus } from "react-icons/fa";
import { BsGripVertical } from "react-icons/bs";
import { FaRegFileAlt } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="input-group" style={{ maxWidth: 420 }}>
          <span className="input-group-text bg-white">
            <FaSearch />
          </span>
          <input className="form-control" placeholder="Search..." />
        </div>

        <div className="d-flex gap-2">
          <button className="btn btn-light border">
            <FaPlus className="me-2" />
            Group
          </button>
          <button className="btn btn-danger">
            <FaPlus className="me-2" />
            Assignment
          </button>
        </div>
      </div>

      <div className="border rounded">
        <div className="d-flex justify-content-between align-items-center bg-light px-3 py-2 border-bottom">
          <div className="d-flex align-items-center gap-2">
            <BsGripVertical />
            <span className="fw-bold">ASSIGNMENTS</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge rounded-pill bg-white text-dark border">
              40% of Total
            </span>
            <button className="btn btn-sm btn-light border">
              <FaPlus />
            </button>
            <button className="btn btn-sm btn-light border">⋮</button>
          </div>
        </div>

        {[
          {
            title: "A1",
            note: "Multiple Modules",
            available: "Not available until May 6 at 12:00am",
            due: "Due May 13 at 11:59pm",
          },
          {
            title: "A2",
            note: "Multiple Modules",
            available: "Not available until May 13 at 12:00am",
            due: "Due May 20 at 11:59pm",
          },
          {
            title: "A3",
            note: "Multiple Modules",
            available: "Not available until May 20 at 12:00am",
            due: "Due May 27 at 11:59pm",
          },
        ].map((a) => (
          <div
            key={a.title}
            className="d-flex align-items-center border-top px-3 py-3"
          >
            <div className="me-3 text-muted">
              <BsGripVertical />
            </div>

            <div className="me-3 text-danger">
              <FaRegFileAlt />
            </div>

            <div className="flex-fill">
              <div className="fw-bold">
                <Link href={`/courses/1234/assignments/${a.title}/edit`} className="text-decoration-none text-dark">
                  {a.title}
                </Link>
              </div>
              <div className="small text-muted">
                <span className="text-danger">{a.note}</span>
                {" | "}
                {a.available}
                {" | "}
                {a.due}
                {" | "}
                100 pts
              </div>
            </div>

            <div className="text-success fs-5 me-3">
              <FaCheckCircle />
            </div>

            <div className="text-muted">⋮</div>
          </div>
        ))}
      </div>
    </div>
  );
}
