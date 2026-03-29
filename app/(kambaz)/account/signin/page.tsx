"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { setCurrentUser } from "../reducer";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { FormControl, Button, Alert } from "react-bootstrap";
import * as client from "../client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const signin = async () => {
    try {
      setError("");
      const user = await client.signin(credentials);
      if (!user) return;
      dispatch(setCurrentUser(user));
      router.push("/account/profile");
    } catch (e: any) {
      dispatch(setCurrentUser(null));
      setError("Unable to sign in.");
      console.error(e);
    }
  };

  return (
    <div id="wd-signin-screen">
      <h1>Sign in</h1>

      {error && <Alert variant="danger">{error}</Alert>}

      <FormControl
        value={credentials.username || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, username: e.target.value })
        }
        className="mb-2"
        placeholder="username"
        id="wd-username"
      />

      <FormControl
        value={credentials.password || ""}
        onChange={(e) =>
          setCredentials({ ...credentials, password: e.target.value })
        }
        className="mb-2"
        placeholder="password"
        type="password"
        id="wd-password"
      />

      <Button onClick={signin} className="w-100 mb-2" id="wd-signin-btn">
        Sign in
      </Button>

      <Link href="/account/signup" id="wd-signup-link">
        Sign up
      </Link>
    </div>
  );
}