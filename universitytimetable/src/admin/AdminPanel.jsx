import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./../styles/AdminPanel.css";

function AdminPanel() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="admin-container">
      <nav className="top-navbar">
        <h2>Admin Panel</h2>
        <ul className="nav-links">
          <li><Link to="/admin/dashboard">Dashboard</Link></li>
          <li className="dropdown" onClick={() => setDropdownOpen(!dropdownOpen)}>
            Actions
            {dropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/admin/users">Manage Users</Link></li>
                <li><Link to="/admin/courses">Manage Courses</Link></li>
                <li><Link to="/admin/timetable">Manage Timetable</Link></li>
                <li><Link to="/admin/rooms">Manage Rooms</Link></li>
                <li><Link to="/admin/notifications">Notifications</Link></li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default AdminPanel;
