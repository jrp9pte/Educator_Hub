// import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
        <Route path="overall_dashboard" element={<Dashboard />} />
        <Route path="student_directory" element={<StudentDirectory />} />
        <Route path="teacher_directory" element={<TeacherDirectory />} />
        <Route path="teacher_dashboard" element={<TeacherDashboard />} />
        <Route path="class_page/:id" element={<ClassPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
