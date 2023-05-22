import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home Page</h1>
      <Link to="/overall_dashbaord">Dashboard</Link>
      <span style={{ margin: "0 10px" }}>|</span>
    </div>
  );
}

export default HomePage;
