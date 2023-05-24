import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from './../../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import Table from "./Table";

function Student_Directory() {
  const studentColRef = collection(db, "Students");
  const [studentList, setStudentList] = useState([]);
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
  }, [studentColRef]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Student Directory</h1>
      <Link to="/">Home</Link>
      {Table(studentList)}
    </div>
  );
}

export default Student_Directory;