import CLASS_PAGE from "../components/CLASS_PAGE/CLASS_PAGE.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import {Container, Row, Col, Image} from "react-bootstrap"
import Login from "../components/AUTH/Login";

const ClassPage = () => {
  const [newTeacherName, setNewTeacherName] = useState("");
 
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
    <>
      <CLASS_PAGE />
    </>
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

export default ClassPage;
