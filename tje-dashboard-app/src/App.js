// import { render } from "react-dom";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";
import Calendar from "./pages/Calendar.js";
import StudentDirectory from "./pages/StudentDirectory.js";
import TeacherDirectory from "./pages/TeacherDirectory.js";
import TeacherDashboard from "./pages/TeacherDashboard.js";
import ClassPage from "./pages/ClassPage.js";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="overall_dashboard">
              <Route index element={<Dashboard />} />
              <Route
                path=":classID/class_page/:className"
                element={<ClassPage />}
              />
            </Route>
            <Route path="student_directory" element={<StudentDirectory />} />
            <Route path="teacher_directory" element={<TeacherDirectory />} />
            <Route
              path="teacher_dashboard/:teacherID"
              element={<TeacherDashboard />}
            />
            <Route
              path="teacher_dashboard/:teacherID/class_page/:classId"
              element={<ClassPage />}
            />
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
      </div>
    </ThemeProvider>
  );
}

export default App;
