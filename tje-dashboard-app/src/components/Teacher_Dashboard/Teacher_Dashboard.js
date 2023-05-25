import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { getDocs, collection } from "firebase/firestore";
import Button from "@mui/material/Button";
import { ButtonGroup } from "@mui/material";


function TEACHER_DASHBOARD() {
  const [classList, setClassList] = useState([]);

  const classCollectionRef = collection(db, "Classes");
  const navigate = useNavigate();
  const { teacherID } = useParams();
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
        <Link to="/Home" style={{ marginRight: "10px" }}>
          <Button>Home</Button>
        </Link>
        <Link onClick={() => navigate(-1)}>
          <Button>Teacher Directory</Button>
        </Link>
      </ButtonGroup>
      <br />
      <br />
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
