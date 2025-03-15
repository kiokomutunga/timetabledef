import React, { useState } from "react";

const AddRoomForm = () => {
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomType, setRoomType] = useState("Theory"); // Default to "Theory"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomData = {
      name: roomName,
      capacity: parseInt(capacity, 10),
      type: roomType, // "Practical" or "Theory"
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/rooms/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(roomData),
      });

      if (response.ok) {
        alert("Room added successfully!");
        setRoomName("");
        setCapacity("");
        setRoomType("Theory"); // Reset to default
      } else {
        alert("Error adding room");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Add a New Room</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Room Name:
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            required
          />
        </label>
        <label>
          Capacity:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            required
          />
        </label>
        <label>
          Room Type:
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)} required>
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
          </select>
        </label>
        <button type="submit">Add Room</button>
      </form>
    </div>
  );
};

export default AddRoomForm;
