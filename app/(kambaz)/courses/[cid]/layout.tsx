import { ReactNode } from "react";
import CourseNavigation from "./navigation";
import { FaAlignJustify } from "react-icons/fa6";
import { courses } from "../../database";
import Breadcrumb from "./breadcrumb";

export default async function CoursesLayout({
  children,
  params,
}: Readonly<{ children: ReactNode; params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        <Breadcrumb />
      </h2>

      <div className="d-flex">
        <div className="d-none d-md-block" style={{ width: 220 }}>
          <CourseNavigation />
        </div>
        <div className="flex-fill ms-4">{children}</div>
      </div>
    </div>
  );
}