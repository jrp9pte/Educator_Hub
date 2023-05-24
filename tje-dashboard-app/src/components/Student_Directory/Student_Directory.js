import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function GetClass (classes, id) {
  let className = "";
  for (let i =0; i<classes.length; i++) {
    if (classes[i].id === id) {
      className = classes[i].name
    }

    return className;
  }
  
}
function Student_Directory() {
  const studentColRef = collection(db, "Students");
  const classRef = collection(db, "Classes");
  const [studentList, setStudentList] = useState([]);
  const [classList, setClassList] = useState([]);

  useEffect(() => {
    const getClassList = async () => {
      try {
        const classD = await getDocs(classRef);
        const filteredData = classD.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setClassList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getClassList();
  }, []);

  useEffect(() => {
    const getStudentList = async () => {
      try {
        const data = await getDocs(studentColRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudentList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.log(err);
      }
    };
    getStudentList();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Student Directory</h1>
      <Link to="/">Home</Link>
      <div>
        <Box sx= {{ minWidth : 275}}>
          
        {studentList.map((data) => (
          <div key={data.id}>
            <Card variant = "outlined">
          <React.Fragment>
            <CardContent>
              <Typography sx={{ fontSize: 16 }} gutterBottom>
              {data.name}, Age: {data.age}
              </Typography>
              <br></br>
              <Typography  sx= {{ fontSize: 14}} >
              Classes Taken: 
              {data.classesTaken.map( (c) => (
                <div key = {c.id}>
                  {/* {GetClass(classList, c.class.id)} */}
                  
                </div>
              ))}
              </Typography>
          <br></br>
          </CardContent>
        </React.Fragment>
        </Card>
        <br></br>
        </div>
        ))}
        
        </Box>
      </div>
    </div>
  );
}

export default Student_Directory;