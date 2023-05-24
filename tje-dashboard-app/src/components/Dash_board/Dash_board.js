import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { db } from "../../firebase.js";
import { getDocs, collection, addDoc, doc, deleteDoc } from "firebase/firestore";

function DASH_BOARD() {
  const [classList, setClassList] = useState([]);
  const [newClassName, setNewClassName] = useState("");

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
      // console.log(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddClass = async () => {
    try {
      await addDoc(classCollectionRef, {name: newClassName});
      setNewClassName("");
      getClassList();
    }catch (err){
      console.log(err);
    }
  };

  const handleDeleteClass = async (classId) => {
    try {
      await deleteDoc(doc(db,"Classes", classId));
      getClassList();
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <div style={{ textAlign: "center" }}>
      <h1>Overall Dashboard</h1>
      <Link to="/">Home</Link>
      <br></br>
      <br></br>
      <div>
        <input
          type="text"
          value={newClassName}
          onChange={(e) => setNewClassName(e.target.value)}
          placeholder="Enter new class name"
        />
        <button onClick={handleAddClass}> Add Class</button>
        {classList.map((target) => {
            return (
              <div key={target.id}>
                <Link
                  to={
                    "/teacher_dashboard/" +
                    target.id +
                    "/class_page/" +
                    target.name
                  }
                >
                  {target.name}
                </Link>
                <button onClick={() => handleDeleteClass(target.id)}>Delete</button>
              </div>
            );
          
        })}
      </div>
    </div>
  );
}

export default DASH_BOARD;


