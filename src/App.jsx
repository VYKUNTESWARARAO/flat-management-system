import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/admin/Sidebar.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import AdminLayout from "./pages/AdminLayout.jsx";
import Residents from "./components/admin/crudpages/Residents.jsx";
import Tenants from "./components/admin/crudpages/Tenants.jsx";
import Staff from "./components/admin/crudpages/Staff.jsx";
import Complaints from "./components/admin/crudpages/Complaints.jsx";
import Payments from "./components/admin/crudpages/Payments.jsx";
import HomePage from "./Pages/HomePage.jsx";

const App = () => {
  return (
    <Routes>
      {/* Public Landing Page */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AdminLayout />} />

      {/* Admin Layout with Sidebar */}
      <Route
        path="/admin/*"
        element={
          <div className="d-flex">
            <Sidebar />
            <div className="flex-grow-1 p-3">
              <Routes>
                <Route path="/dashboard" element={<AdminLayout />} />
                <Route path="/residents" element={<Residents />} />
                <Route path="/tenants" element={<Tenants />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/complaints" element={<Complaints />} />
                <Route path="/payments" element={<Payments />} />
              </Routes>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default App;
