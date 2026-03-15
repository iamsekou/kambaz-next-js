"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  FormControl,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addNewCourse, deleteCourse, updateCourse } from "../courses/reducer";
import { enroll, unenroll } from "../enrollments/reducer";
import { RootState } from "../store";

export default function Dashboard() {
  const dispatch = useDispatch();

  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  ) as { currentUser: any };
  const { enrollments } = useSelector(
    (state: RootState) => state.enrollmentsReducer
  );

  const [showAllCourses, setShowAllCourses] = useState(false);

  const [course, setCourse] = useState<any>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    image: "/images/reactjs.jpg",
    description: "New Description",
  });

  const visibleCourses = courses.filter((course: any) =>
    showAllCourses
      ? true
      : enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser?._id &&
            enrollment.course === course._id
        )
  );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {currentUser?.role === "FACULTY" && (
        <>
          <h5>
            New Course

            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={() => dispatch(addNewCourse(course))}
            >
              Add
            </button>

            <button
              className="btn btn-warning float-end me-2"
              id="wd-update-course-click"
              onClick={() => dispatch(updateCourse(course))}
            >
              Update
            </button>

            <button
              className="btn btn-primary float-end me-2"
              onClick={() => setShowAllCourses(!showAllCourses)}
            >
              Enrollments
            </button>
          </h5>

          <FormControl
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />

          <FormControl
            as="textarea"
            rows={3}
            value={course.description}
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />

          <hr />
        </>
      )}

      {currentUser?.role !== "FACULTY" && (
        <Button
          className="float-end me-2 mb-3"
          variant="primary"
          onClick={() => setShowAllCourses(!showAllCourses)}
        >
          Enrollments
        </Button>
      )}

      <h2 id="wd-dashboard-published">
        Published Courses ({visibleCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {visibleCourses.map((course: any) => {
            const isEnrolled = enrollments.some(
              (enrollment: any) =>
                enrollment.user === currentUser?._id &&
                enrollment.course === course._id
            );

            return (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    href={isEnrolled ? `/courses/${course._id}/home` : "/dashboard"}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <CardImg
                      src={course.image || "/images/reactjs.jpg"}
                      variant="top"
                      width="100%"
                      height={160}
                    />

                    <CardBody className="card-body">
                      <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </CardTitle>

                      <CardText
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </CardText>

                      <Button variant="primary">Go</Button>

                      {currentUser?.role === "FACULTY" && (
                        <>
                          <Button
                            variant="danger"
                            className="float-end"
                            id="wd-delete-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(deleteCourse(course._id));
                            }}
                          >
                            Delete
                          </Button>

                          <Button
                            variant="warning"
                            className="float-end me-2"
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                          >
                            Edit
                          </Button>
                        </>
                      )}

                      {showAllCourses && currentUser && (
                        isEnrolled ? (
                          <Button
                            variant="danger"
                            className="float-end me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                unenroll({
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Unenroll
                          </Button>
                        ) : (
                          <Button
                            variant="success"
                            className="float-end me-2"
                            onClick={(event) => {
                              event.preventDefault();
                              dispatch(
                                enroll({
                                  user: currentUser._id,
                                  course: course._id,
                                })
                              );
                            }}
                          >
                            Enroll
                          </Button>
                        )
                      )}
                    </CardBody>
                  </Link>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}