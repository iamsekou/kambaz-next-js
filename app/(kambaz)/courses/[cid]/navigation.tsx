// app/(kambaz)/courses/[cid]/navigation.tsx
"use client";

import Link from "next/link";
import { usePathname, useParams } from "next/navigation";

export default function CourseNavigation() {
  const pathname = usePathname();
  const { cid } = useParams<{ cid: string }>();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((label) => {
        // Build hrefs 
        const href =
          label === "People"
            ? `/courses/${cid}/people/table`
            : `/courses/${cid}/${label.toLowerCase()}`;

        // Highlight logic
        const active =
          label === "People"
            ? pathname.includes(`/courses/${cid}/people`)
            : pathname === `/courses/${cid}/${label.toLowerCase()}`;

        return (
          <Link
            key={label}
            href={href}
            id={`wd-course-${label.toLowerCase()}-link`}
            className={`list-group-item border-0 ${
              active ? "active" : "text-danger"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}