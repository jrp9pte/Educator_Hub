import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

function CLASS_PAGE() {
  //useParams() yields the id ":id" of the url. This can be used to title the coourses as shown on line 14
  const { id } = useParams();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Class Page</h1>
      <Link to="/overall_dashboard">Dashboard</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/teacher_dashboard">Teacher Dashboard</Link>
      <h2>Class {id}</h2>
    </div>
  );
}

export default CLASS_PAGE;
