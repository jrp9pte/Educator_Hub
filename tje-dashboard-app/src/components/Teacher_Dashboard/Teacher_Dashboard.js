import { Link } from "react-router-dom";

function TEACHER_DASHBOARD() {
  //TODO : Map all courses, creating a new element of the list for each course, passing its unique id/tag to the url class_page/:id
  /*
  Something like:
  map (
  const tag = "/class_page/" + id
  )
  <Link to={tag}>{"Class " + tag}</Link>
  */

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Teacher Dashboard</h1>
      <Link to="/">Home</Link>
      <div>
        <li>
          <Link to="class_page/1">Class 1</Link>
        </li>
        <li>
          <Link to="class_page/2">Class 2</Link>
        </li>
      </div>
    </div>
  );
}

export default TEACHER_DASHBOARD;
