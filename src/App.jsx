// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/admin/Sidebar.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import Residents from "./components/admin/crudpages/Residents.jsx";
import Tenants from "./components/admin/crudpages/Tenants.jsx";
import Staff from "./components/admin/crudpages/Staff.jsx";
import Complaints from "./components/admin/crudpages/Complaints.jsx";
import Payments from "./components/admin/crudpages/Payments.jsx";
import HomePage from "./Pages/HomePage.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminWrapper = () => {
  return (
    <div className="d-flex">
      <Sidebar />
      <div className="flex-grow-1 p-3">
        <Routes>
          <Route path="dashboard" element={<AdminLayout />} />
          <Route path="residents" element={<Residents />} />
          <Route path="tenants" element={<Tenants />} />
          <Route path="staff" element={<Staff />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="payments" element={<Payments />} />
          {/* Redirect /admin to /admin/dashboard */}
          <Route path="" element={<Navigate to="dashboard" replace />} />
          {/* Catch-all for unknown admin routes */}
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        {/* Public Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminWrapper />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
};

export default App;
