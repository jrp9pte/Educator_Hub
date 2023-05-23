import { Link } from "react-router-dom";
import { useNavigate, useParams, useMatch } from "react-router-dom";

function CLASS_PAGE() {
  //useParams() yields the id ":id" of the url. This can be used to title the coourses as shown on line 14

  const { id } = useParams();
  const navigate = useNavigate();
  const teacherDashboardMatch = useMatch("/teacher_dashboard");
  const teacherDashboardAndClassMatch = useMatch(
    "/teacher_dashboard/:id/class_page/:id"
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Class Page</h1>
      <Link to="/overall_dashboard">Dashboard</Link>
      {(teacherDashboardMatch || teacherDashboardAndClassMatch) && (
        <>
          <span style={{ margin: "0 10px" }}>|</span>
          <Link onClick={() => navigate(-1)}>Teacher Dashboard</Link>
        </>
      )}
      <h2>Class {id}</h2>
    </div>
  );
}

export default CLASS_PAGE;
