import React from "react";
import { Link } from "react-router-dom";
import "./../styles/managecoursess.css";
import AddDepartment from "./AddDepartment";
import AddSchool from "./AddSchool";
import AddCourseForm from "./addCourse";

function ManageCourses() {
  return (
    <div className="manage-courses">
      <h2>Manage Courses</h2>
      <ul className="course-links">
        <li><Link to="/admin/AddDepartment">Add New Department</Link></li>
        <li><Link to="/admin/addSchool"> Add School</Link></li>
        <li><Link to="/admin/addCourse">Add Course</Link></li>
        <li><Link to="/admin/courses/dashboard">Course Dashboard</Link></li>
        <li><Link to="/admin/courses/list">Course List</Link></li>
        <li><Link to="/admin/courses/enrollment">Manage Enrollment</Link></li>
        <li><Link to="/admin/courses/view">View Courses</Link></li>
        <li><Link to="/admin/courses/export">Export Course Data</Link></li>
      </ul>
    </div>
  );
}

export default ManageCourses;
