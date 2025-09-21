import React from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../components/admin/Topbar.jsx";
import Sidebar from "../components/admin/Sidebar.jsx";
import "../styles/admin.css"; // optional styles
import AdminDashboard from "../components/admin/AdminDashboard.jsx";

const AdminLayout = () => {
  return (
    <div className="admin-layout d-flex">
      <div className="admin-content flex-grow-1">
        <Topbar />
        <main className="p-3">
          <Outlet />
          <AdminDashboard />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
