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
          <LoginForm />
        <Row>
        <Col>
          <iframe
            style={{margin:'5%'}}
            src="https://calendar.google.com/calendar/embed?src=c_d45a5e6cf0d4fedfe804fd8f39269699f596aa178cd2c3aa53cb1efec73944fb%40group.calendar.google.com&ctz=America%2FNew_York"
            width="700"
            height="500"
            scrolling="no"
          ></iframe>
        </Col>
        </Row>
        </div>
  );
}

export default HOME;
