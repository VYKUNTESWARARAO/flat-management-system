import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaUsers,
  FaHome,
  FaUserTie,
  FaUserFriends,
  FaMoneyBill,
  FaExclamation,
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar p-3">
      <h4 className="text-white mb-4">Admin Panel</h4>
      <ul className="nav flex-column">
        <li>
          <NavLink to="/admin/dashboard" end className="nav-link text-white">
            <FaHome className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/tenants" className="nav-link text-white">
            <FaUsers className="me-2" /> Tenants
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/staff" className="nav-link text-white">
            <FaUserTie className="me-2" /> Staff
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/residents" className="nav-link text-white">
            <FaUserFriends className="me-2" /> Residents
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/complaints" className="nav-link text-white">
            <FaExclamation className="me-2" /> Complaints
          </NavLink>
        </li>
        <li>
          <NavLink to="/admin/payments" className="nav-link text-white">
            <FaMoneyBill className="me-2" /> Payments
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
