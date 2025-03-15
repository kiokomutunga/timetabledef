import React, { useState } from "react";
import "./../styles/addSchool.css"

const AddSchool = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/api/schools/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });

    if (response.ok) {
      alert("School Added Successfully!");
      setName(""); // Clear form
    } else {
      alert("Error adding school!");
    }
  };

  return (
    <div>
      <h2>Add School</h2>
      <form onSubmit={handleSubmit}>
        <label>School Name:</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} required  />
        <br />
        <button type="submit">Add School</button>
      </form>
    </div>
  );
};

export default AddSchool;
