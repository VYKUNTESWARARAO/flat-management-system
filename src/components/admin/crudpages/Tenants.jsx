import React from "react";
import { Card, Table, Button } from "react-bootstrap";
import Topbar from "../Topbar.jsx";

const Tenants = () => {
  return (
    <>
      <Topbar />
      <Card className="shadow-sm">
        <Card.Header>Manage Tenants</Card.Header>
        <Card.Body>
          <div className="d-flex justify-content-end mb-3">
            <Button variant="primary">+ Add Tenant</Button>
          </div>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>PG Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>1</td>
                <td>Vikram</td>
                <td>9876543210</td>
                <td>Harini PG</td>
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

export default Tenants;
