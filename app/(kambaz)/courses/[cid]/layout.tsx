// app/(kambaz)/courses/[cid]/layout.tsx
import { ReactNode } from "react";
import CourseNavigation from "./navigation";

export default function CoursesLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div id="wd-courses">
      <div className="d-flex">
        <div className="d-none d-md-block" style={{ width: 220 }}>
          <CourseNavigation />
        </div>
        <div className="flex-fill ms-4">{children}</div>
      </div>
    </div>
  );
}
