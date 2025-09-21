import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import Topbar from "../Topbar.jsx";

const Residents = () => {
  return (
    <>
      <Topbar />
      <Card className="shadow-sm">
        <Card.Header>Manage Residents</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary">+ Add Resident</Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Room No</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Rahul</td>
                <td>203</td>
                <td>9001234567</td>
                <td>
                  <Button size="sm" variant="info" className="me-2">
                    ✏️ Edit
                  </Button>
                  <Button size="sm" variant="danger">
                    🗑️ Delete
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

export default Residents;
