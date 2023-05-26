import { Link } from "react-router-dom";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import Button from "@mui/material/Button";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase.js";
import { useEffect, useState } from "react";
import MenuItem from "@mui/material/MenuItem";
import { auth } from "../../firebase";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { signOut } from "firebase/auth";
import { LogoutButton } from "../HOME/HOME.js";
function CLASS_PAGE() {
  const [change, setChange] = useState(false);

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

  const [teacherList, setTeacherList] = useState([]);

  const [studentList, setStudentList] = useState([]);

  const [classData, setClassData] = useState();

  const { className } = useParams();
  const { classID } = useParams();

  const newClassId = className.charAt(0).toUpperCase() + className.slice(1);
  const navigate = useNavigate();
  const teacherDashboardMatch = useMatch("/teacher_dashboard");
  const teacherDashboardAndClassMatch = useMatch(
    "/teacher_dashboard/:id/:id/class_page/:id"
  );
  const [prevName, setPrevName] = useState("");
  const [newGrade, setNewGrade] = useState("");

  const [addStudentName, setAddStudentName] = useState("");
  const [addGrade, setAddGrade] = useState("");

  const [removeStudentName, setRemoveStudentName] = useState("");

  useEffect(() => {
    const getTeacherList = async () => {
      const teacherCollectionRef = collection(db, "Teachers");
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
      const studentCollectionRef = collection(db, "Students");
      try {
        const data = await getDocs(studentCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setStudentList(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getStudentList();
  }, [change]);

  useEffect(() => {
    const getClassData = async () => {
      const docRef = doc(db, "Classes", classID);
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = {
            ...docSnapshot.data(),
            id: docSnapshot.id,
          };
          setClassData(data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getClassData();
  }, []);

  async function editStudent() {
    try {
      let changedStudent = studentList.filter(
        (student) => student.name === prevName
      );
      setPrevName("");

      const docRef = doc(db, "Students", changedStudent[0].id);
      const docSnap = await getDoc(docRef);
      const updatedStudent = docSnap.data();

      if (updatedStudent) {
        const classesTaken = [...updatedStudent.classesTaken];
        const updatedClassesTaken = classesTaken.map((classTaken) => {
          if (classTaken.class.id === classData.id) {
            return {
              ...classTaken,
              grade: newGrade,
            };
          }
          return classTaken;
        });
        setNewGrade("");

        await updateDoc(docRef, {
          classesTaken: updatedClassesTaken,
        });
        setChange(!change);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function addStudentToClass() {
    try {
      let changedStudent = studentList.filter(
        (student) => student.name === addStudentName
      );
      setAddStudentName("");

      const docRef = doc(db, "Students", changedStudent[0].id);
      const docSnap = await getDoc(docRef);
      const updatedStudent = docSnap.data();

      if (updatedStudent) {
        const classesTaken = [...updatedStudent.classesTaken];
        const classRef = doc(db, "Classes", classData.id);
        const newClass = {
          class: classRef,
          grade: addGrade,
        };
        const updatedClassesTaken = [...classesTaken, newClass];
        setAddGrade("");

        await updateDoc(docRef, {
          classesTaken: updatedClassesTaken,
        });
        setChange(!change);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function removeStudentFromClass() {
    try {
      let changedStudent = studentList.find(
        (student) => student.name === removeStudentName
      );
      if (changedStudent) {
        const updatedClassesTaken = changedStudent.classesTaken.filter(
          (classTaken) => classTaken.class.id !== classData.id
        );

        const docRef = doc(db, "Students", changedStudent.id);

        await updateDoc(docRef, {
          classesTaken: updatedClassesTaken,
        });
        setChange(!change);
        setRemoveStudentName("");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div style={{ textAlign: "center" }}>

<div
          style={{
            display: "grid",
            alignItems: "center",
            width: "100%",
            gridTemplateColumns: "1fr 1fr 1fr",
          }}
        >
        <div></div>
        <h1 style={{
                margin: "auto",
                maxHeight: "60px",
                display:"flex", 
                justifyContent: "center"
              }}>Class Page</h1>
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
      <Link to="/overall_dashboard">
        <Button variant="contained">Dashboard</Button>
      </Link>
      {(teacherDashboardMatch || teacherDashboardAndClassMatch) && (
        <>
          <span style={{ margin: "0 10px" }}>|</span>
          <Link onClick={() => navigate(-1)}>
            <Button variant="contained">Teacher Dashboard</Button>
          </Link>
        </>
      )}
      <h2>
        {" "}
        {classData && teacherList ? (
          <div>
            {classData.teacher &&
              teacherList
                .filter((teacher) => teacher.id === classData.teacher.id)
                .map((teacher) => teacher.name)}
            <span>'s {newClassId} Class</span>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </h2>
      <header>
        <h2>Edit A Student</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            justifyContent: "center",
          }}
        >
          <div>
            <h4>Change Student Grade</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 225,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Student</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={prevName}
                    label="Previous Name"
                    onChange={(e) => setPrevName(e.target.value)}
                  >
                    {studentList.map((student) => {
                      const matchingClass = student.classesTaken.find(
                        (classTaken) => classTaken.class.id === classData.id
                      );
                      if (matchingClass) {
                        return (
                          <MenuItem key={student.id} value={student.name}>
                            {" "}
                            {student.name}{" "}
                          </MenuItem>
                        );
                      }
                      return null;
                    })}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                value={newGrade}
                onChange={(e) => setNewGrade(e.target.value)}
                label="New Grade"
                variant="outlined"
                sx={{ width: 225 }}
              />
            </div>
            <br></br>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <Button variant="contained" onClick={() => editStudent()}>
                  Submit Changes
                </Button>
              </div>
            </div>
          </div>
          <div>
            <h4>Add A Student</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 225,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Student</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={addStudentName}
                    label="Previous Name"
                    onChange={(e) => setAddStudentName(e.target.value)}
                  >
                    {studentList.map((student) => {
                      const matchingClass = student.classesTaken.find(
                        (classTaken) => classTaken.class.id === classData.id
                      );
                      if (!matchingClass) {
                        return (
                          <MenuItem key={student.id} value={student.name}>
                            {" "}
                            {student.name}{" "}
                          </MenuItem>
                        );
                      }
                      return null;
                    })}
                  </Select>
                </FormControl>
              </Box>
              <TextField
                value={addGrade}
                onChange={(e) => setAddGrade(e.target.value)}
                label="Grade"
                variant="outlined"
                sx={{ width: 225 }}
              />
            </div>
            <br></br>
            <div>
              <Button
                style={{ marginBottom: "20px" }}
                variant="contained"
                onClick={() => addStudentToClass()}
              >
                Add Student
              </Button>
            </div>
          </div>
          <div>
            <h4>Remove A Student</h4>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  width: 225,
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Student</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={removeStudentName}
                    label="Previous Name"
                    onChange={(e) => setRemoveStudentName(e.target.value)}
                  >
                    {studentList.map((student) => {
                      const matchingClass = student.classesTaken.find(
                        (classTaken) => classTaken.class.id === classData.id
                      );
                      if (matchingClass) {
                        return (
                          <MenuItem key={student.id} value={student.name}>
                            {" "}
                            {student.name}{" "}
                          </MenuItem>
                        );
                      }
                      return null;
                    })}
                  </Select>
                </FormControl>
              </Box>
            </div>
            <br></br>
            <div>
              <Button
                style={{ marginBottom: "20px" }}
                variant="contained"
                onClick={() => removeStudentFromClass()}
              >
                Remove Student
              </Button>
            </div>
          </div>
        </div>
      </header>
      {classData && studentList ? (
        <div>
          <h3>Students</h3>
          {studentList.map((student) => {
            const matchingClass = student.classesTaken.find(
              (classTaken) => classTaken.class.id === classData.id
            );
            if (matchingClass) {
              return (
                <div key={student.id}>
                  <p>{student.name + ": " + matchingClass.grade + "%"}</p>
                </div>
              );
            }
            return null;
          })}
          {studentList.every(
            (student) =>
              !student.classesTaken.find(
                (classTaken) => classTaken.class.id === classData.id
              )
          ) && <p>No Students Taking Class</p>}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

export default CLASS_PAGE;
