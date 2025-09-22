// App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Public Pages
import HomePage from "./Pages/HomePage.jsx";

// Admin Pages
import Sidebar from "./components/admin/Sidebar.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import Residents from "./components/admin/crudpages/Residents.jsx";
import Tenants from "./components/admin/crudpages/Tenants.jsx";
import Staff from "./components/admin/crudpages/Staff.jsx";
import Complaints from "./components/admin/crudpages/Complaints.jsx";
import Payments from "./components/admin/crudpages/Payments.jsx";
import Apartments from "./components/admin/crudpages/Apartments.jsx";

// Resident Pages
import ResidentLayout from "./pages/ResidentLayout.jsx";
import ResidentProfile from "./components/resident/ResidentProfile.jsx";

// Manager Pages
import ManagerDashboard from "./pages/ManagerDashboard.jsx";

const AdminWrapper = () => (
  <div className="d-flex">
    <Sidebar />
    <div className="flex-grow-1 p-3">
      <Routes>
        <Route path="dashboard" element={<AdminLayout />} />
        <Route path="apartments" element={<Apartments />} />
        <Route path="residents" element={<Residents />} />
        <Route path="tenants" element={<Tenants />} />
        <Route path="staff" element={<Staff />} />
        <Route path="complaints" element={<Complaints />} />
        <Route path="payments" element={<Payments />} />
        <Route path="" element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Routes>
    </div>
  </div>
);

const ResidentWrapper = () => (
  <Routes>
    <Route element={<ResidentLayout />}>
      <Route path="/dashboard" element={<ResidentLayout />} />{" "}
      {/* Hero shows by default in layout */}
      <Route path="/profile" element={<ResidentProfile />} />

      <Route path="" element={<Navigate to="/dashboard" replace />} />
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Route>
  </Routes>
);

const ManagerWrapper = () => (
  <Routes>
    <Route path="dashboard" element={<ManagerDashboard />} />
    <Route path="*" element={<Navigate to="dashboard" replace />} />
  </Routes>
);

const App = () => (
  <>
    <ToastContainer position="top-right" autoClose={2000} />
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />

      {/* Role Based Routes */}
      <Route path="/admin/*" element={<AdminWrapper />} />
      <Route path="/resident/*" element={<ResidentWrapper />} />
      <Route path="/manager/*" element={<ManagerWrapper />} />

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </>
);

export default App;
