import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import {Container, Row, Col, Image} from "react-bootstrap"
import Login from "../AUTH/Login";
import Button from "@mui/material/Button";

import {  signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const HOME = () => {
  const [newTeacherName, setNewTeacherName] = useState("");
  const navigate = useNavigate();
 
    const handleLogout = () => {               
        signOut(auth).then(() => {
        // Sign-out successful.
            navigate("/");
            console.log("Signed out successfully")
        }).catch((error) => {
        // An error happened.
        });
    }
 
  useEffect(()=>{
      onAuthStateChanged(auth, (user) => {
          if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;
            setNewTeacherName("a");
            // ...
            console.log("uid", uid)
          } else {
            setNewTeacherName("");
            // User is signed out
            // ...
            console.log("user is logged out")
          }
        });
       
  }, [])
  if(newTeacherName === "a") {
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
      <span style={{ margin: "0 10px" }}>|</span>

      <button onClick={handleLogout}>Logout</button>
      <br></br>
      <br></br>
    </div>
  );
}
else {
  return(
  <div style={{ textAlign: "center" }}>
 {<Login />} 
  </div>
  )
}
}

export default HOME;
