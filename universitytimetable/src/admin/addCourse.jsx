import React, { useState, useEffect } from "react";

const AddCourseForm = () => {
  const [courseName, setCourseName] = useState("");
  const [department, setDepartment] = useState("");
  const [years, setYears] = useState("4"); // Default set to 4 years
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    // Fetch departments from the backend
    fetch("http://127.0.0.1:8000/api/departments/")
      .then((response) => response.json())
      .then((data) => setDepartments(data))
      .catch((error) => console.error("Error fetching departments:", error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      name: courseName,
      department: department,
      duration: years, // Default duration is now 4 years
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/courses/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        alert("Course added successfully!");
        setCourseName("");
        setDepartment("");
        setYears("4"); // Reset to default 4 years after adding
      } else {
        alert("Error adding course");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add a New Course</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Course Name:
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
        </label>
        <label>
          Department:
          <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Duration (Years):
          <select value={years} onChange={(e) => setYears(e.target.value)} required>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
          </select>
        </label>
        <button type="submit">Add Course</button>
      </form>
    </div>
  );
};

export default AddCourseForm;
