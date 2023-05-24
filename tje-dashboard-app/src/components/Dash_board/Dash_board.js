import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { getDocs, collection } from "firebase/firestore";

function DASH_BOARD() {
  const [classList, setClassList] = useState([]);

  const classCollectionRef = collection(db, "Classes");

  useEffect(() => {
    const getClassList = async () => {
      try {
        const data = await getDocs(classCollectionRef);
        const filteredData = data.docs.map((doc) => ({
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

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Overall Dashboard</h1>
      <Link to="/">Home</Link>
      <br></br>
      <br></br>
      <div>
        {classList.map((classes) => (
          <div key={classes.id}>
            <Link to={"/overall_dashboard/" + classes.id}>{classes.name + " - " + classes.teacher.name}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DASH_BOARD;