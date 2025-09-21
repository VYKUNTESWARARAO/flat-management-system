import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import Topbar from "../Topbar.jsx";
const Complaints = () => {
  return (
    <>
      <Topbar />
      <Card className="shadow-sm">
        <Card.Header>Complaints</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Resident</th>
                <th>Room No</th>
                <th>Issue</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Sneha</td>
                <td>102</td>
                <td>Water Leakage</td>
                <td>Pending</td>
                <td>
                  <Button size="sm" variant="success" className="me-2">
                    Resolve
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

export default Complaints;
