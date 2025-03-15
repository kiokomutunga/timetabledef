import React, { useState, useEffect } from "react";
import axios from "axios";
import "./../styles/coursemanagee.css"; // Import the CSS file
const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetchCourses();
    fetchDepartments();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/courses/');
      setCourses(response.data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/departments/');
      setDepartments(response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setShowEditModal(true);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://127.0.0.1:8000/api/courses/${editingCourse.id}/`, editingCourse);
      fetchCourses(); // Refresh course list
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/courses/${id}/`);
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  return (
    <div className="course-container">
      <h2>Course List</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration (Years)</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.duration_years}</td>
              <td>{course.department_name}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(course)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(course.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Edit Course</h3>
            <label>Course Name:</label>
            <input
              type="text"
              name="name"
              value={editingCourse.name}
              onChange={handleChange}
            />

            <label>Duration (Years):</label>
            <select
              name="duration_years"
              value={editingCourse.duration_years}
              onChange={handleChange}
            >
              <option value="3">3 Years</option>
              <option value="4">4 Years</option>
              <option value="5">5 Years</option>
            </select>

            <label>Department:</label>
            <select
              name="department"
              value={editingCourse.department}
              onChange={handleChange}
            >
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>

            <button className="save-btn" onClick={handleSave}>Save</button>
            <button className="cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseList;
