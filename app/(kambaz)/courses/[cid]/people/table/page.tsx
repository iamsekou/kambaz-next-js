// app/(kambaz)/courses/[cid]/people/table/page.tsx
import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  const users = [
    {
      firstName: "Tony",
      lastName: "Stark",
      loginId: "001234561S",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-01",
      totalActivity: "10:21:32",
    },
    {
      firstName: "Bruce",
      lastName: "Wayne",
      loginId: "001234562S",
      section: "S101",
      role: "STUDENT",
      lastActivity: "2020-10-02",
      totalActivity: "08:15:45",
    },
    {
      firstName: "Steve",
      lastName: "Rogers",
      loginId: "001234563S",
      section: "S102",
      role: "STUDENT",
      lastActivity: "2020-10-01",
      totalActivity: "12:05:20",
    },
    {
      firstName: "Natasha",
      lastName: "Romanoff",
      loginId: "001234564S",
      section: "S102",
      role: "STUDENT",
      lastActivity: "2020-09-30",
      totalActivity: "09:45:15",
    },
  ];

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.loginId}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.loginId}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity}</td>
              <td className="wd-total-activity">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
