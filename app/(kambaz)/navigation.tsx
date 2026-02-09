"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  const pathname = usePathname();

  const isDashboard = pathname === "/dashboard";

  return (
    <ListGroup
      id="wd-kambaz-navigation"
      className="rounded-0 position-fixed top-0 bottom-0 d-none d-md-block bg-black"
      style={{ width: 120 }}
    >
      {/* Northeastern */}
      <ListGroupItem
        className="bg-black border-0 text-center py-3"
        as="a"
        href="https://www.northeastern.edu/"
        target="_blank"
        id="wd-neu-link"
      >
        <img src="/images/NEU.png" width="75" alt="Northeastern University" />
      </ListGroupItem>

      {/* Account */}
      <ListGroupItem className="bg-black border-0 text-center py-3">
        <Link
          href="/account"
          id="wd-account-link"
          className="text-white text-decoration-none"
        >
          <FaRegCircleUser className="fs-1" />
          <div>Account</div>
        </Link>
      </ListGroupItem>

      {/* Dashboard */}
      <ListGroupItem
        className={`border-0 text-center py-3 ${
          isDashboard ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/dashboard"
          id="wd-dashboard-link"
          className={`text-decoration-none ${
            isDashboard ? "text-danger" : "text-white"
          }`}
        >
          <AiOutlineDashboard className="fs-1" />
          <div>Dashboard</div>
        </Link>
      </ListGroupItem>

      {/* Courses (routes to dashboard in this chapter) */}
      <ListGroupItem
        className={`border-0 text-center py-3 ${
          isDashboard ? "bg-white" : "bg-black"
        }`}
      >
        <Link
          href="/dashboard"
          id="wd-course-link"
          className={`text-decoration-none ${
            isDashboard ? "text-danger" : "text-white"
          }`}
        >
          <LiaBookSolid className="fs-1" />
          <div>Courses</div>
        </Link>
      </ListGroupItem>

      {/* Calendar */}
      <ListGroupItem className="bg-black border-0 text-center py-3">
        <Link
          href="/calendar"
          id="wd-calendar-link"
          className="text-white text-decoration-none"
        >
          <IoCalendarOutline className="fs-1" />
          <div>Calendar</div>
        </Link>
      </ListGroupItem>

      {/* Inbox */}
      <ListGroupItem className="bg-black border-0 text-center py-3">
        <Link
          href="/inbox"
          id="wd-inbox-link"
          className="text-white text-decoration-none"
        >
          <FaInbox className="fs-1" />
          <div>Inbox</div>
        </Link>
      </ListGroupItem>

      {/* Labs */}
      <ListGroupItem className="bg-black border-0 text-center py-3">
        <Link
          href="/labs"
          id="wd-labs-link"
          className="text-white text-decoration-none"
        >
          <LiaCogSolid className="fs-1" />
          <div>Labs</div>
        </Link>
      </ListGroupItem>
    </ListGroup>
  );
}
