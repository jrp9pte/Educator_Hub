import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";

function TEACHER_DASHBOARD() {
  const [classList, setClassList] = useState([]);

  const classCollectionRef = collection(db, "Classes");

  const navigate = useNavigate();
  const { teacherID } = useParams();

  const docRef = doc(db, "Teachers", teacherID);
  const [teacherData, setTeacherData] = useState();

  console.log(teacherID);

  useEffect(() => {
    const getClassList = async () => {
      try {
        const data = await getDocs(classCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setClassList(filteredData);
        // console.log(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getClassList();
  }, []);

  useEffect(() => {
    const getTeacherData = async () => {
      try {
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
          const data = {
            ...docSnapshot.data(),
            id: docSnapshot.id,
          };
          setTeacherData(data);
        } else {
          console.log("Teacher does not exist");
        }
      } catch (err) {
        console.log(err);
      }
    };

    getTeacherData();
  }, []);

  const teacherClasses = classList.filter(
    (targetClass) =>
      targetClass.teacher &&
      targetClass.teacher.id &&
      teacherID === targetClass.teacher.id
  );

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Teacher Dashboard</h1>

      <ButtonGroup variant="contained" aria-label="outlined button group">
        <Link to="/" style={{ marginRight: "10px" }}>
          <Button>Home</Button>
        </Link>
        <Link onClick={() => navigate(-1)}>
          <Button>Teacher Directory</Button>
        </Link>
      </ButtonGroup>
      <h2>{teacherData ? teacherData.name : null}</h2>
      <div>
        {teacherClasses.length === 0 ? (
          <p>No Classes Being Taught</p>
        ) : (
          teacherClasses.map((targetClass) => (
            <div key={targetClass.id}>
              <Link
                to={
                  "/teacher_dashboard/" +
                  teacherID +
                  "/" +
                  targetClass.id +
                  "/class_page/" +
                  targetClass.name
                }
              >
                <Button variant="outlined">{targetClass.name}</Button>
              </Link>
              <br />
              <br />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default TEACHER_DASHBOARD;
