import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import Topbar from "../Topbar.jsx";

const Staff = () => {
  return (
    <>
      <Topbar />
      <Card className="shadow-sm">
        <Card.Header>Manage Staff</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary">+ Add Staff</Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Anita</td>
                <td>9123456789</td>
                <td>Cook</td>
                <td>
                  <Button size="sm" variant="info" className="me-2">
                    Edit
                  </Button>
                  <Button size="sm" variant="danger">
                    Delete
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );
};

export default Staff;
