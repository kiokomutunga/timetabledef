import React from "react";
import {Link} from "react-router-dom";

function ManageRooms() {
  return (
    <div className="manage-rooms">
      <h2>Manage Rooms</h2>
      <ul>
        <li><Link to="/admin/rooms/addroom">Add Room</Link></li>
        
        <li><Link to="/admin/rooms/view">View Rooms</Link></li>
        
      </ul>
    </div>
  );
};

export default ManageRooms;
