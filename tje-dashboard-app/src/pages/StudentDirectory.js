import Student_Directory from "../components/Student_Directory/Student_Directory.js";
import { Link } from "react-router-dom";

function StudentDirectory() {
  return (
    <div style={{ textAlign: "center" }}>
      <Student_Directory />
      <Link to="/">Home</Link>
    </div>
  );
}

export default StudentDirectory;
