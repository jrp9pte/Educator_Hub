import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home Page</h1>
      <Link to="/overall_dashbaord">Dashboard</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/student_directory">Student Directory</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/teacher_directory">Teacher Directory</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/teacher_dashboard">Teacher Dashboard</Link>
    </div>
  );
}

export default HomePage;
