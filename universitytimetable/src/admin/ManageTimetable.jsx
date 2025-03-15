import React, { useState } from "react";
import "./../styles/ManageTimetable.css";
import jsPDF from "jspdf";

function ManageTimetable() {
  const [searchTerm, setSearchTerm] = useState(""); // Search filter input
  const [timetable, setTimetable] = useState({
    "Year 1": [
      { id: 1, course: "Computer Science", unit: "Introduction to Programming", room: "A101", lecturer: "Dr. Smith", day: "Monday", time: "8:00 AM - 10:00 AM" },
      { id: 2, course: "Computer Science", unit: "Mathematics I", room: "B202", lecturer: "Prof. Johnson", day: "Tuesday", time: "10:00 AM - 12:00 PM" },
    ],
    "Year 2": [
      { id: 3, course: "Computer Science", unit: "Data Structures", room: "C303", lecturer: "Dr. Brown", day: "Wednesday", time: "1:00 PM - 3:00 PM" },
      { id: 4, course: "Computer Science", unit: "Algorithms", room: "D404", lecturer: "Dr. Williams", day: "Thursday", time: "2:00 PM - 4:00 PM" },
    ],
  });

  // Function to handle search filtering
  const filteredTimetable = Object.keys(timetable).reduce((acc, year) => {
    acc[year] = timetable[year].filter((entry) => {
      if (!entry.unit || !entry.lecturer) return false; // Ensure entry is valid

      // Convert to string safely before calling .toLowerCase()
      const unit = entry.unit ? String(entry.unit).toLowerCase() : "";
      const lecturer = entry.lecturer ? String(entry.lecturer).toLowerCase() : "";
      const search = searchTerm.toLowerCase();

      return unit.includes(search) || lecturer.includes(search);
    });
    return acc;
  }, {});

  // Export to PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("University Timetable", 10, 10);
    let y = 20;
    Object.keys(timetable).forEach((year) => {
      doc.text(year, 10, y);
      y += 10;
      timetable[year].forEach((entry) => {
        doc.text(`${entry.unit} - ${entry.lecturer} (${entry.day} ${entry.time})`, 10, y);
        y += 10;
      });
    });
    doc.save("timetable.pdf");
  };

  return (
    <div className="timetable-container">
      <h2>University Timetable Management</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search by unit or lecturer..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />

      {/* Export PDF Button */}
      <button onClick={exportPDF} className="export-button">Export as PDF</button>

      {Object.keys(filteredTimetable).map((year) => (
        <div key={year} className="year-section">
          <h3>{year} - Computer Science</h3>
          <table className="timetable-table">
            <thead>
              <tr>
                <th>Unit</th>
                <th>Lecturer</th>
                <th>Room</th>
                <th>Day</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {filteredTimetable[year].map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.unit}</td>
                  <td>{entry.lecturer}</td>
                  <td>{entry.room}</td>
                  <td>{entry.day}</td>
                  <td>{entry.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default ManageTimetable;
