import Link from "next/link";

const members = [
  { name: "Sekou Samassi", section: "Section 202630_1" },
  { name: "Awad Buisir", section: "Section 202630_1" },
  { name: "Maryam Abdus Salaam", section: "Section 202630_1" },
];

const repos = [
  {
    label: "Front-end (Next.js)",
    url: "https://github.com/iamsekou/kambaz-next-js",
  },
  {
    label: "Server (Node / Express)",
    url: "https://github.com/iamsekou/kambaz-node-server-app",
  },
];

export default function TeamPage() {
  return (
    <div id="wd-team" className="p-5">
      <h1 className="mb-4">Team</h1>

      <h2 className="h4 mt-4">Members</h2>
      <ul className="list-group mb-4" id="wd-team-members">
        {members.map((m) => (
          <li key={m.name} className="list-group-item d-flex justify-content-between">
            <span>{m.name}</span>
            <span className="text-muted">{m.section}</span>
          </li>
        ))}
      </ul>

      <h2 className="h4 mt-4">Repositories</h2>
      <ul className="list-group mb-4" id="wd-team-repos">
        {repos.map((r) => (
          <li key={r.url} className="list-group-item">
            <strong>{r.label}:</strong>{" "}
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              {r.url}
            </a>
          </li>
        ))}
      </ul>

      <Link href="/" className="btn btn-outline-secondary">
        ← Back to landing
      </Link>
    </div>
  );
}
