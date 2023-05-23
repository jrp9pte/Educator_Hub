// import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import StudentDirectory from "./pages/StudentDirectory.js";
import TeacherDirectory from "./pages/TeacherDirectory.js";
import TeacherDashboard from "./pages/TeacherDashboard.js";
import ClassPage from "./pages/ClassPage.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="overall_dashboard">
          <Route index element={<Dashboard />} />
          <Route path="class_page/:id" element={<ClassPage />} />
        </Route>
        <Route path="student_directory" element={<StudentDirectory />} />
        <Route path="teacher_directory" element={<TeacherDirectory />} />
        <Route path="teacher_dashboard">
          <Route index element={<TeacherDashboard />} />
          <Route path=":id" element={<TeacherDashboard />} />
          <Route path=":id/class_page/:id" element={<ClassPage />} />
        </Route>
        <Route
          path="*"
          element={
            <div style={{ textAlign: "center" }}>
              <h1
                style={{
                  fontWeight: "bold",
                  fontSize: "50px",
                }}
              >
                Page Not Found
              </h1>
              <Link to="/">Home Page</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
