import React from "react";
import { Link } from "react-router-dom";

import { Row, Col } from "react-bootstrap";
import Button from "@mui/material/Button";

import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import Login from "../components/AUTH/Login";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { LogoutButton } from "../components/HOME/HOME";

const Calendar = () => {
  const [newTeacherName, setNewTeacherName] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setNewTeacherName("a");
        // ...
        console.log("uid", uid);
      } else {
        setNewTeacherName("");
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  }, []);
  if (newTeacherName === "a") {
    return (
      <div style={{ textAlign: "center" }}>


        <div
          style={{
            display: "grid",
            alignItems: "center",
            width: "100%",
            gridTemplateColumns: "1fr 1fr 1fr",
          }} >
          <div></div>
          <h1 style={{
                  margin: "auto",
                  maxHeight: "60px",
                  display:"flex", 
                  justifyContent: "center"
                }}>Calender
          </h1>
          <div style={{ marginLeft: "auto" }}>
              <LogoutButton
                variant="contained"
                onClick={handleLogout}
                style={{
                  marginRight: "20px",
                  marginLeft: "20px",
                  marginTop: "15px",
                }}
              >
                Logout
              </LogoutButton>
          </div>
        </div>




        <Link to="/Home">
          <Button variant="contained">Home</Button>
        </Link>


        <Row>
          <Col>
            <iframe
              style={{ margin: "5%" }}
              src="https://calendar.google.com/calendar/embed?src=c_d45a5e6cf0d4fedfe804fd8f39269699f596aa178cd2c3aa53cb1efec73944fb%40group.calendar.google.com&ctz=America%2FNew_York"
              width="700"
              height="500"
              scrolling="no"
            ></iframe>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div style={{ textAlign: "center" }}>{<Login />}</div>;
  }
};
export default Calendar;
