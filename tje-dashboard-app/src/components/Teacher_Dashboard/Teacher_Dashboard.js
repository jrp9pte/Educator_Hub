import { Link } from "react-router-dom";

function TEACHER_DASHBOARD() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Teacher Dashboard</h1>
      <Link to="/">Home</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/overall_dashboard">Dashboard</Link>
    </div>
  );
}

export default TEACHER_DASHBOARD;
