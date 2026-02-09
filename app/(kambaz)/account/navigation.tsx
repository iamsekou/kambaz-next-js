"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaRegCircleUser } from "react-icons/fa6";

export default function AccountNavigation() {
  const pathname = usePathname();

  const active = (href: string) => pathname === href;

  const linkClass = (href: string) =>
    `list-group-item border-0 ${
      active(href) ? "active" : "text-danger"
    }`;

  return (
    <div className="text-center">
      <img src="/images/NEU.png" width="200" alt="Northeastern University" />

      <div className="my-3">
        <FaRegCircleUser className="fs-1 text-danger" />
        <div className="text-danger">Account</div>
      </div>

      <ListGroup className="rounded-0 fs-4 text-start">
        <ListGroupItem>
          <Link id="wd-signin-link" href="/account/signin" className={linkClass("/account/signin")}>
            Signin
          </Link>
        </ListGroupItem>

        <ListGroupItem>
          <Link id="wd-signup-link" href="/account/signup" className={linkClass("/account/signup")}>
            Signup
          </Link>
        </ListGroupItem>

        <ListGroupItem>
          <Link id="wd-profile-link" href="/account/profile" className={linkClass("/account/profile")}>
            Profile
          </Link>
        </ListGroupItem>
      </ListGroup>
    </div>
  );
}
