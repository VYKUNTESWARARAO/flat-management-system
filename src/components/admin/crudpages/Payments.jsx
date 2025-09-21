import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import Topbar from "../Topbar.jsx";

const Payments = () => {
  return (
    <>
      <Topbar />
      <Card className="shadow-sm">
        <Card.Header>Payments</Card.Header>
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Resident</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Amit</td>
                <td>₹5000</td>
                <td>Paid</td>
                <td>2025-09-18</td>
                <td>
                  <Button size="sm" variant="warning" className="me-2">
                    Update
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

export default Payments;
