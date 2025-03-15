import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminPanel from "./admin/AdminPanel";
import Dashboard from "./admin/Dashboard";
import ManageUsers from "./admin/ManageUsers";
import ManageCourses from "./admin/ManageCourses";
import ManageTimetable from "./admin/ManageTimetable";
import ManageRooms from "./admin/ManageRooms";
import Notifications from "./admin/Notifications";
import AddDepartment from "./admin/AddDepartment";
import AddSchool from "./admin/AddSchool";
import AddCourseForm from "./admin/addCourse";
import AddRoomForm from "./admin/addRoom";
import CourseList from "./admin/coursemanagee";
import RoomView from "./admin/viewRooms";
import CourseManagement from "./admin/courseDashboard";

function App() {
  return (
    <Router>
      <div className="app-layout">
        <AdminPanel />
        <div className="main-content">
          <Routes>
            <Route path = "/admin/addDepartment" element = {<AddDepartment/>} />
            <Route path = "/admin/addSchool" element = { <AddSchool/>} />
            <Route path = "/admin/addCourse" element = { <AddCourseForm/>} />
            <Route path="/admin/courses/list" element = {<CourseList/>}/>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/users" element={<ManageUsers />} />
            <Route path="/admin/rooms/view" element={<RoomView />} />
            <Route path="/admin/courses/dashboard" element={<CourseManagement />} />
            <Route path="/admin/courses" element={<ManageCourses />} />
            <Route path="/admin/timetable" element={<ManageTimetable />} />
            <Route path="/admin/rooms" element={<ManageRooms />} />
            <Route path="/admin/rooms/addroom" element={<AddRoomForm />} />
            <Route path="/admin/notifications" element={<Notifications />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
