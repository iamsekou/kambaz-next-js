import Link from "next/link";

export default function Kambaz() {
  return (
    <div id="wd-landing" className="p-5">
      <h1 className="display-4 mb-3">Welcome to Kambaz</h1>
      <p className="lead mb-4">
        A full-stack learning management system built with Next.js, Express,
        and MongoDB.
      </p>

      <div className="d-flex gap-3 flex-wrap">
        <Link
          id="wd-landing-team-link"
          href="/team"
          className="btn btn-danger btn-lg"
        >
          Meet the Team
        </Link>
        <Link
          id="wd-landing-signin-link"
          href="/account/signin"
          className="btn btn-outline-secondary btn-lg"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
}
