import Teacher_Dashboard from "../components/Teacher_Dashboard/Teacher_Dashboard.js";
import { Link } from "react-router-dom";

function TeacherDashboard() {
  return (
    <div style={{ textAlign: "center" }}>
      <Teacher_Dashboard />
      <Link to="/">Home</Link>
    </div>
  );
}

export default TeacherDashboard;
