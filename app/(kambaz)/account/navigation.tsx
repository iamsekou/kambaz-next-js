"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "../store";

export default function AccountNavigation() {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const pathname = usePathname();

  const linkClass = (href: string) =>
    `d-block text-decoration-none ${
      pathname === href ? "text-white" : "text-danger"
    }`;

  return (
    <div className="text-center">
      <img src="/images/NEU.png" width="200" alt="Northeastern University" />

      <div className="my-3">
        <FaRegCircleUser className="fs-1 text-danger" />
        <div className="text-danger">Account</div>
      </div>

      <ListGroup className="rounded-0 fs-4 text-start">
        {!currentUser && (
          <>
            <ListGroupItem
              className={pathname === "/account/signin" ? "active" : ""}
            >
              <Link
                id="wd-signin-link"
                href="/account/signin"
                className={linkClass("/account/signin")}
              >
                Signin
              </Link>
            </ListGroupItem>

            <ListGroupItem
              className={pathname === "/account/signup" ? "active" : ""}
            >
              <Link
                id="wd-signup-link"
                href="/account/signup"
                className={linkClass("/account/signup")}
              >
                Signup
              </Link>
            </ListGroupItem>
          </>
        )}

        {currentUser && (
          <ListGroupItem
            className={pathname === "/account/profile" ? "active" : ""}
          >
            <Link
              id="wd-profile-link"
              href="/account/profile"
              className={linkClass("/account/profile")}
            >
              Profile
            </Link>
          </ListGroupItem>
        )}
      </ListGroup>
    </div>
  );
}