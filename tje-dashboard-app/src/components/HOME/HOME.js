import { Link } from "react-router-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import {Container, Row, Col, Image} from "react-bootstrap"
import Login from "../AUTH/Login";
import Button from "@mui/material/Button";
import ButtonGroup from '@mui/material/ButtonGroup';
import { styled } from '@mui/material/styles';

import { Typography, Grid } from '@mui/material';


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
  const containerStyle = {
    // textAlign: "center",
    backgroundImage:
      'url("https://nationalblueribbonschools.ed.gov/awardwinners/winning/asset/2020/school_photos/20wi110pu_thomas_jefferson_elementary_school_original.jpg")',
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "100vh",
  };

  const LogoutButton = styled(Button)(({ theme }) => ({
    backgroundColor: '#f5f5f5', // Red color
    color: '#212121', // White color
    marginTop: "20px",
    marginBottom: "15px",
    '&:hover': {
      backgroundColor: '#d32f2f', // Darker red color on hover
      
    },
  }));

  if(newTeacherName === "a") {


return (
  <div style={containerStyle}>
   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <div>
        <h1 style={{
          fontFamily: 'Times New Roman, serif',
          fontSize: '48px',
          fontWeight: 'bold',
          color: '#212121',
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          margin: '0px',
          paddingBottom: '0px',
          maxHeight: "60px",
          marginLeft:"500px"
        }}>
          Home Page
        </h1>
      </div>
      <div style={{ marginLeft: 'auto' }}>
        <LogoutButton variant="contained" onClick={handleLogout} style = {{marginRight:"20px", marginLeft:"20px", marginTop:"15px"}}>
          Logout
        </LogoutButton>
      </div>
    </div>
  </div>
    {/* <Button color="secondary" onClick={handleLogout}>Logout</Button> */}
    {/* <LogoutButton variant="contained" onClick={handleLogout}> Logout</LogoutButton> */}

    <div style={{
      display: "flex",
      justifyContent: "center",
      marginTop: "20px",
    }}>
      {/* <ButtonGroup variant="contained" aria-label="outlined button group"> */}
        <Link to="/overall_dashboard" style={{ marginRight: "10px" }}>
          <Button color="primary" variant="contained"  >Dashboard</Button>
        </Link>
        <Link to="/student_directory" style={{ marginRight: "10px" }}>
          <Button color="primary"  variant="contained" >Student Directory</Button>
        </Link>
        <Link to="/teacher_directory" style={{ marginRight: "10px" }}>
          <Button color="primary"   variant="contained" >Teacher Directory</Button>
        </Link>
        <Link to="/calendar" style={{ marginRight: "10px" }}>
          <Button color="primary"  variant="contained" >Calendar</Button>
        </Link>
      {/* </ButtonGroup> */}
    </div>

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
