import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.js";
import Dashboard from "./pages/Dashboard.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="overall_dashbaord" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
