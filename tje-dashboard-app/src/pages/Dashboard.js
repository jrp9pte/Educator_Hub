import Dash_board from "../components/Dash_board/Dash_board.js";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div style={{ textAlign: "center" }}>
      <Dash_board />
      <Link to="/">Home</Link>
    </div>
  );
}

export default Dashboard;
