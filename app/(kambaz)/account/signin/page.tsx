import { FormControl } from "react-bootstrap";
import Link from "next/link";

export default function Signin() {
  return (
    <div id="wd-signin-screen" style={{ maxWidth: 360 }}>
      <h3 className="mb-3">Sign in</h3>

      <FormControl id="wd-username" placeholder="username" className="mb-2" />
      <FormControl id="wd-password" placeholder="password" type="password" className="mb-2" />

      <Link id="wd-signin-btn" href="/account/profile" className="btn btn-primary w-100 mb-2">
        Sign in
      </Link>

      <div className="text-center">
        <Link id="wd-signup-link" href="/account/signup">Sign up</Link>
      </div>
    </div>
  );
}

