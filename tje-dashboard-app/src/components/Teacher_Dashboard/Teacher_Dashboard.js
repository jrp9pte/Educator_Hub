import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { getDocs, collection } from "firebase/firestore";

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

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Teacher Dashboard</h1>
      <Link to="/">Home</Link>
      <span style={{ margin: "0 10px" }}>|</span>
      <Link onClick={() => navigate(-1)}>Teacher Directory</Link>
      <br></br>
      <br></br>
      <div>
        {classList.map((targetClass) => {
          if (teacherID === targetClass.teacher.id) {
            return (
              <div key={targetClass.id}>
                <Link
                  to={
                    "/teacher_dashboard/" +
                    teacherID +
                    "/class_page/" +
                    targetClass.name
                  }
                >
                  {targetClass.name}
                </Link>
              </div>
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
}

export default TEACHER_DASHBOARD;
