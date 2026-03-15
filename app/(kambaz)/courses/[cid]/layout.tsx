"use client";
import { ReactNode, useState } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa6";
import Breadcrumb from "./breadcrumb";
import { useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { RootState } from "../../store";

export default function CoursesLayout({ children }: { children: ReactNode }) {
  const [showCourseNavigation, setShowCourseNavigation] = useState(true);

  const { cid } = useParams();
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const course = courses.find((course: any) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify
          className="me-4 fs-4 mb-1"
          onClick={() => setShowCourseNavigation(!showCourseNavigation)}
          style={{ cursor: "pointer" }}
        />
        {course?.name}
        <Breadcrumb />
      </h2>

      <div className="d-flex">
        {showCourseNavigation && (
          <div style={{ width: 220 }}>
            <CourseNavigation />
          </div>
        )}
        <div className="flex-fill ms-4">{children}</div>
      </div>
    </div>
  );
}