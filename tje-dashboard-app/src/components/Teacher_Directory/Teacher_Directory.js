import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { getDocs, collection } from "firebase/firestore";

function TEACHER_DIRECTORY() {
  const [teacherList, setTeacherList] = useState([]);

  const teacherCollectionRef = collection(db, "Teachers");

  useEffect(() => {
    const getTeacherList = async () => {
      try {
        const data = await getDocs(teacherCollectionRef);
        const filteredData = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setTeacherList(filteredData);
        console.log(filteredData);
      } catch (err) {
        console.log(err);
      }
    };

    getTeacherList();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Teacher Directory</h1>
      <Link to="/">Home</Link>
      <br></br>
      <br></br>
      <div>
        {teacherList.map((teacher) => (
          <div key={teacher.id}>
            <Link to={"/teacher_dashboard/" + teacher.id}>{teacher.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TEACHER_DIRECTORY;
