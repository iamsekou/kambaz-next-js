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

  const links = [
    { label: "Dashboard", path: "/dashboard", icon: AiOutlineDashboard },
    // Intentionally routes to dashboard in this chapter
    { label: "Courses", path: "/dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/inbox", icon: FaInbox },
    { label: "Labs", path: "/labs", icon: LiaCogSolid },
  ];

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
        action
      >
        <img src="/images/NEU.png" width="75" alt="Northeastern University" />
      </ListGroupItem>

      {/* Account */}
      <ListGroupItem
        as={Link}
        href="/account"
        id="wd-account-link"
        className={`text-center border-0 bg-black ${
          pathname.includes("account")
            ? "bg-white text-danger"
            : "bg-black text-white"
        }`}
        action
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroupItem>

      {/* Dynamic links */}
      {links.map((link) => {
        const active =
          pathname === link.path || pathname.includes(link.label.toLowerCase());

        const Icon = link.icon;

        return (
          <ListGroupItem
            key={link.label}
            as={Link}
            href={link.path}
            className={`text-center border-0 ${
              active ? "bg-white text-danger" : "bg-black text-white"
            }`}
            action
          >
            <Icon className={`fs-1 ${active ? "text-danger" : "text-white"}`} />
            <br />
            {link.label}
          </ListGroupItem>
        );
      })}
    </ListGroup>
  );
}