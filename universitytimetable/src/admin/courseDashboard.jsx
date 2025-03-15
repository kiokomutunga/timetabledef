import React, { useEffect, useState } from "react";
import "./../styles/CourseList.css"; // Import the CSS file

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [courseName, setCourseName] = useState("");
  const [courseDepartment, setCourseDepartment] = useState("");
  const [courseDuration, setCourseDuration] = useState(4);

  // Fetch courses from API
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/courses/");
      if (!response.ok) throw new Error("Failed to fetch courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Open Edit Form
  const handleEdit = (course) => {
    setEditingCourse(course.id);
    setCourseName(course.name);
    setCourseDepartment(course.department);
    setCourseDuration(course.duration_years);
  };

  // Save Edited Course
  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/courses/${editingCourse}/`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: courseName,
            department: courseDepartment,
            duration_years: parseInt(courseDuration, 10),
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update course");
      fetchCourses();
      setEditingCourse(null);
      setCourseName("");
      setCourseDepartment("");
      setCourseDuration(4);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  // Delete Course with Confirmation
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/courses/${id}/`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete course");
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  return (
    <div className="course-container">
      <h2>Course Management</h2>
      <table className="course-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration (Years)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.name}</td>
              <td>{course.duration_years}</td>
              <td>
                <button onClick={() => handleEdit(course)} className="edit-btn">
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form */}
      {editingCourse && (
        <div className="edit-form">
          <h3>Edit Course</h3>
          <label>Course Name:</label>
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />

          <label>Department:</label>
          <input
            type="text"
            value={courseDepartment}
            onChange={(e) => setCourseDepartment(e.target.value)}
          />

          <label>Duration (Years):</label>
          <select
            value={courseDuration}
            onChange={(e) => setCourseDuration(e.target.value)}
          >
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
          </select>

          <button onClick={handleSave} className="save-btn">Save</button>
          <button onClick={() => setEditingCourse(null)} className="cancel-btn">Cancel</button>
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
