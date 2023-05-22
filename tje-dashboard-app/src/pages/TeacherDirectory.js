import Teacher_Directory from "../components/Teacher_Directory/Teacher_Directory.js";
import { Link } from "react-router-dom";

function TeacherDirectory() {
  return (
    <div style={{ textAlign: "center" }}>
      <Teacher_Directory />
      <Link to="/">Home</Link>
    </div>
  );
}

export default TeacherDirectory;
