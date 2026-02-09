import { FaCheckCircle, FaEllipsisV } from "react-icons/fa";
import { Button } from "react-bootstrap";

export default function ModuleControlButtons() {
  return (
    <span className="float-end">
      <FaCheckCircle className="text-success me-2 fs-5" />
      <Button variant="secondary" size="sm" className="me-1">
        <FaEllipsisV />
      </Button>
    </span>
  );
}
