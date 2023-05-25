import { Link } from "react-router-dom";

import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import Login from "../AUTH/Login";
import Button from "@mui/material/Button";

function HOME() {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Home Page</h1>
      <Link to="/overall_dashboard">
        <Button variant="contained">Dashboard</Button>
      </Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/student_directory">
        {" "}
        <Button variant="contained">Student Directory</Button>
      </Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/teacher_directory">
        {" "}
        <Button variant="contained">Teacher Directory</Button>
      </Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link to="/calendar">
        {" "}
        <Button variant="contained">Calendar</Button>
      </Link>
      <br></br>
      <br></br>
    </div>
  );
}

export default HOME;
