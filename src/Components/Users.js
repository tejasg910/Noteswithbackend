import React, { useEffect, useContext } from "react";
import { useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Allusers from "./Allusers";

const Users = () => {


  const context = useContext(noteContext);
  const { getusers, userData, host } = context;
  const [arrdata, setarrData] = useState();
  console.log(userData)

  const getAllUsers = ()=>{
    // getusers();
  }

  useEffect(() => {
   
      getusers();

  
  }, []);

  return (
    <>
    <div className="container">
    <h2>These are the users who registered with us </h2>
   
      {userData.map((data)=>{

      return  <Allusers key={data._id} name={data.name} email={data.email} date={data.date.slice(0,10)}/>
      })}
    </div>
    
    </>
  );
};

export default Users;
