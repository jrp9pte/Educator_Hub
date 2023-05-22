import { Link } from "react-router-dom";

function CLASS_PAGE() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Class Page</h1>
      <Link to="/overall_dashboard">Dashboard</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/teacher_dashboard">Teacher Dashboard</Link>
    </div>
  );
}

export default CLASS_PAGE;
