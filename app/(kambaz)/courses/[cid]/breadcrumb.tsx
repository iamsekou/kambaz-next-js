"use client";

import { usePathname, useParams } from "next/navigation";
import { courses } from "../../database";

export default function Breadcrumb() {
  const pathname = usePathname();
  const { cid } = useParams<{ cid: string }>();

  // Get the course from the database
  const course = courses.find((course) => course._id === cid);
  const courseName = course?.name || "";

  // Get the part after /courses/[cid]/
  const afterCourse = pathname.split(`/courses/${cid}/`)[1] || "home";

  // People route is /people/table -> show "People"
  const section = afterCourse.startsWith("people") ? "People" : afterCourse.split("/")[0];

  const sectionLabel = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <span>
      {courseName} &gt; {sectionLabel}
    </span>
  );
}