import { Link } from "react-router-dom";

function DASH_BOARD() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>
      <Link to="/">Home</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/class_page">Class</Link>
    </div>
  );
}

export default DASH_BOARD;
