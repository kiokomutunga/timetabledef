import React, { useState, useEffect } from "react";
import "./../styles/viewrooms.css"; // Import CSS for styling

const RoomView = () => {
  const [rooms, setRooms] = useState([]);
  const [editingRoom, setEditingRoom] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [roomType, setRoomType] = useState("Theory"); // Default room type

  // Fetch rooms from the backend
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/rooms/");
      const data = await response.json();
      setRooms(data);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  // Handle Edit
  const handleEdit = (room) => {
    setEditingRoom(room.id);
    setRoomName(room.name);
    setCapacity(room.capacity);
    setRoomType(room.room_type);
  };

  // Handle Update
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/rooms/${id}/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: roomName,
          capacity: parseInt(capacity, 10),
          room_type: roomType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update room");
      }

      fetchRooms(); // Refresh list
      setEditingRoom(null);
      setRoomName("");
      setCapacity("");
      setRoomType("Theory");
    } catch (error) {
      console.error("Update error:", error);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this room?");
    if (!confirmDelete) return;

    try {
      await fetch(`http://127.0.0.1:8000/api/rooms/${id}/`, { method: "DELETE" });
      fetchRooms(); // Refresh list
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="room-container">
      <h2>Room Management</h2>

      {editingRoom ? (
        <div className="form-container">
          <h3>Edit Room</h3>
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            placeholder="Room Name"
          />
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            placeholder="Capacity"
          />
          <select value={roomType} onChange={(e) => setRoomType(e.target.value)}>
            <option value="Theory">Theory</option>
            <option value="Practical">Practical</option>
          </select>
          <button onClick={() => handleUpdate(editingRoom)}>Save</button>
          <button onClick={() => setEditingRoom(null)}>Cancel</button>
        </div>
      ) : (
        <div className="room-list">
          <h3>All Rooms</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.name}</td>
                  <td>{room.capacity}</td>
                  <td>{room.room_type}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(room)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(room.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RoomView;
