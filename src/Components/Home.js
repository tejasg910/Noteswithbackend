import React from "react";
import { useContext } from "react";
import noteContext from "../Context/notes/noteContext";
import AddNote from "./AddNote";
import Alert from "./Alert";
import Notes from "./Notes";

const Home = () => {
  const context = useContext(noteContext);
  const   {alert, showAlert} = context
    
   console.log(alert)

  return (
    <div>


      <Alert alert={alert}/>
    <div className="container">
        <AddNote showAlert={showAlert}/>

   <Notes/>
    </div>
    </div>
  );
};

export default Home;
