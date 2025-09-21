import React from "react";
import { Card, Table } from "react-bootstrap";

const AdminDashboard = () => {
  return (
    <>
      <div>
        {/* Summary Cards */}
        <div className="row mb-4">
          <div className="col-md-3">
            <Card className="p-3 text-center shadow-sm">
              <h5>Tenants</h5>
              <h2>120</h2>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="p-3 text-center shadow-sm">
              <h5>Staff</h5>
              <h2>25</h2>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="p-3 text-center shadow-sm">
              <h5>Residents</h5>
              <h2>75</h2>
            </Card>
          </div>
          <div className="col-md-3">
            <Card className="p-3 text-center shadow-sm">
              <h5>Complaints</h5>
              <h2>15</h2>
            </Card>
          </div>
        </div>

        {/* Recent Complaints Table */}
        <Card className="shadow-sm">
          <Card.Header>Recent Complaints</Card.Header>
          <Card.Body>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Resident</th>
                  <th>Issue</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>John Doe</td>
                  <td>Water Leakage</td>
                  <td>Pending</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>Mary Smith</td>
                  <td>Electric Issue</td>
                  <td>Resolved</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default AdminDashboard;
