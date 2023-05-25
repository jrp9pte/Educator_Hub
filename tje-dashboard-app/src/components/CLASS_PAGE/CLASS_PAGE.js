import { Link } from "react-router-dom";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import Button from "@mui/material/Button";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useEffect, useState } from "react";

function CLASS_PAGE() {
  const teacherCollectionRef = collection(db, "Teachers");
  const [teacherList, setTeacherList] = useState([]);

  const studentCollectionRef = collection(db, "Students");
  const [studentList, setStudentList] = useState([]);

  const [classData, setClassData] = useState();

  const { className } = useParams();
  const { classID } = useParams();
  const docRef = doc(db, "Classes", classID);
  const newClassId = className.charAt(0).toUpperCase() + className.slice(1);
  const navigate = useNavigate();
  const teacherDashboardMatch = useMatch("/teacher_dashboard");
  const teacherDashboardAndClassMatch = useMatch(
    "/teacher_dashboard/:id/class_page/:id"
  );

  useEffect(() => {
    const getTeacherList = async () => {
      try {
        const data = await getDocs(teacherCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTeacherList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getTeacherList();
  }, []);

  useEffect(() => {
    const getStudentList = async () => {
      try {
        const data = await getDocs(studentCollectionRef);
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

  useEffect(() => {
    const getClassData = async () => {
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = {
            ...docSnapshot.data(),
            id: docSnapshot.id,
          };
          setClassData(data);
        } else {
          console.log("Document does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getClassData();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Class Page</h1>
      <Link to="/overall_dashboard">
        <Button variant="contained">Dashboard</Button>
      </Link>
      {(teacherDashboardMatch || teacherDashboardAndClassMatch) && (
        <>
          <span style={{ margin: "0 10px" }}>|</span>
          <Link onClick={() => navigate(-1)}>Teacher Dashboard</Link>
        </>
      )}
      <h2> {newClassId} Class</h2>
      {classData && teacherList ? (
        <div>
          Taught By:{" "}
          {classData.teacher &&
            teacherList
              .filter((teacher) => teacher.id === classData.teacher.id)
              .map((teacher) => teacher.name)}
        </div>
      ) : (
        <div>Loading...</div>
      )}
      {classData && teacherList ? (
        <div>
          <h3>Students</h3>
          {}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CLASS_PAGE;
