import OverallDashboard from "../components/OverallDashboard/OverallDashboard.js";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ textAlign: "center" }}>
      <OverallDashboard />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Dashboard;
