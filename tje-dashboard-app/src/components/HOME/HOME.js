import { Link } from "react-router-dom";

import React from 'react';
import {Container, Row, Col, Image} from "react-bootstrap"
import LoginForm from "../AUTH/LoginForm";

function HOME() {
  return (
    	<div style={{ textAlign: "center" }}>
        <h1>Home Page</h1>
          <Link to="/overall_dashboard">Dashboard</Link>
          <span style={{ margin: "0 10px" }}>|</span>
          <Link to="/student_directory">Student Directory</Link>
          <span style={{ margin: "0 10px" }}>|</span>
          <Link to="/teacher_directory">Teacher Directory</Link>
          <span style={{ margin: "0 10px" }}>|</span>
          <Link to="/calendar">Calendar</Link>
          <LoginForm />
        </div>
  );
}

export default HOME;
