"use client";

import { Button, Form } from "react-bootstrap";

export default function EditAssignment() {
  return (
    <div id="wd-edit-assignment" className="pe-4">
      <h2>Edit Assignment</h2>

      <Form>
        {/* Assignment Name */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            defaultValue="A1"
            id="wd-name"
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={6}
            defaultValue="Multiple Modules"
            id="wd-description"
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            defaultValue={100}
            id="wd-points"
          />
        </Form.Group>

        {/* Due Date */}
        <Form.Group className="mb-4">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            defaultValue="2024-05-13"
            id="wd-due-date"
          />
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-end gap-2">
          <a href="/courses/1234/assignments" className="text-decoration-none">
            <Button variant="secondary" id="wd-cancel">
              Cancel
            </Button>
          </a>
          <a href="/courses/1234/assignments" className="text-decoration-none">
            <Button variant="danger" id="wd-save">
              Save
            </Button>
          </a>
        </div>
      </Form>
    </div>
  );
}
