import AccountNavigation from "./navigation";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="d-flex p-3"
      style={{ marginLeft: "120px" }}
    >
      <div className="me-4" style={{ width: "220px" }}>
        <AccountNavigation />
      </div>
      <div className="flex-fill">{children}</div>
    </div>
  );
}