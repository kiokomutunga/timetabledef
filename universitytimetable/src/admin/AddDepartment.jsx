import React, { useState, useEffect } from "react";
import "./../styles/addDepartment.css"

const AddDepartment = () => {
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/schools/")
      .then((res) => res.json())
      .then((data) => setSchools(data));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/departments/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, school }),
    });

    if (response.ok) {
      alert("Department Added!");
      setName("");
    } else {
      alert("Error adding department!");
    }
  };

  return (
    <div>
      <h2>Add Department</h2>
      <form onSubmit={handleSubmit}>
        <label>Department Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        
        <label>School:</label>
        <select value={school} onChange={(e) => setSchool(e.target.value)} required>
          <option value="">Select School</option>
          {schools.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button type="submit">Add Department</button>
      </form>
    </div>
  );
};

export default AddDepartment;
