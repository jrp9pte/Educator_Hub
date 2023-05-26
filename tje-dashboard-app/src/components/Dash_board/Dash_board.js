import { Link } from "react-router-dom";
import { db } from "../../firebase.js";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  where,
  query,
} from "firebase/firestore";
import Button from "@mui/material/Button";
import { ButtonGroup, TextField } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../../firebase';
import {Container, Row, Col, Image} from "react-bootstrap"
import Login from "../AUTH/Login";
import { useNavigate } from 'react-router-dom';
import {  signOut } from "firebase/auth";

const DASH_BOARD = () => {
  const [newTeacherNam, setNewTeacherNam] = useState("");
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
            setNewTeacherNam("a");
            // ...
            console.log("uid", uid)
          } else {
            setNewTeacherNam("");
            // User is signed out
            // ...
            console.log("user is logged out")
          }
        });
       
  }, [])
  const [classList, setClassList] = useState([]);
  const [newClassName, setNewClassName] = useState("");
  const [newTeacherName, setNewTeacherName] = useState("");
  const classCollectionRef = collection(db, "Classes");

  useEffect(() => {
    getClassList();
  }, []);

  const getClassList = async () => {
    try {
      const data = await getDocs(classCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setClassList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddClass = async () => {
    try {
      const teacherCollectionRef = collection(db, "Teachers");
      const teacherQuery = query(
        teacherCollectionRef,
        where("name", "==", newTeacherName)
      );
      const teacherSnapshot = await getDocs(teacherQuery);

      let teacherRef;
      if (newTeacherName === "" || newClassName === "") {
      } else {
        if (teacherSnapshot.empty) {
          teacherRef = await addDoc(teacherCollectionRef, {
            name: newTeacherName,
          });
        } else {
          teacherRef = doc(db, "Teachers", teacherSnapshot.docs[0].id);
        }

        await addDoc(classCollectionRef, {
          name: newClassName,
          teacher: teacherRef,
        });

        setNewClassName("");
        setNewTeacherName("");
        getClassList();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteDoc(doc(db, "Classes", classId));
      getClassList();
    } catch (err) {
      console.log(err);
    }
  };
  if(newTeacherNam === "a") {
  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>
      <ButtonGroup variant="contained" aria-label="outlined button group">
        <Link to="/Home" style={{ textDecoration: "none" }}>
          <Button>Home</Button>
        </Link>
      </ButtonGroup>
      <button onClick={handleLogout}>Logout</button>
      <br></br>
      <h2> Current Classes</h2>
      <div>
        {classList.map((target) => {
          return (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div
                key={target.id}
                style={{
                  margin: "2px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    margin: "2px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      margin: "auto",
                      marginRight: "1px",
                      padding: "3px",
                      justifyContent: "center",
                    }}
                  >
                    <Link
                      to={target.id + "/class_page/" + target.name}
                      style={{
                        textDecoration: "none",
                        color: "#009688",
                        margin: "auto",
                      }}
                    >
                      <Button
                        variant="outline"
                        style={{
                          display: "flex",
                          margin: "auto",
                          maxWidth: "100px",
                          minWidth: "100px",
                        }}
                      >
                        {target.name}
                      </Button>
                    </Link>
                  </div>{" "}
                  <IconButton
                    aria-label="delete"
                    size="large"
                    onClick={() => handleDeleteClass(target.id)}
                    // variant="outlined"
                    style={{ margin: "auto" }}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div>
        <h2> Add a Class </h2>
        <TextField
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Enter new class name"
        />{" "}
        <TextField
          value={newTeacherName}
          onChange={(e) => setNewTeacherName(e.target.value)}
          placeholder="Enter teacher's name"
        />
        <Button
          onClick={handleAddClass}
          variant="outlined"
          style={{ marginLeft: "10px", marginTop: "8px" }}
        >
          Add Class
        </Button>
        <h4>Note: You can't add a class without a teacher</h4>
        <br></br>
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

export default DASH_BOARD;
