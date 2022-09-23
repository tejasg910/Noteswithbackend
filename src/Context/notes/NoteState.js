import { compareSync } from "bcryptjs";
import { useState } from "react";
import { json } from "react-router-dom";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  // const s1 = {
  //     'name': "tejas",
  //     "class": "third"
  // }
  // const [state, updateState] = useState(s1);

  // const update = ()=>{
  //     setTimeout(() => {
  //             updateState({
  //                 "name": "bhai",
  //                 "class": "fourth"
  //             })
  //     }, 1000);
  // }
const host = 'http://localhost:5000';
  const initialNotes = [];
  const initialUsers = [];
  const [notes, setNotes] = useState(initialNotes);

const [alert, setAlert]=  useState(null)
const [userData, setUserData] = useState(initialUsers)
const showAlert = (message, type)=>{
  setAlert({
message: message,
type: type
  })

  setTimeout(() => {
    setAlert(null)
  }, 1500);
}  //getting all notes 


  const getNotes = async()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem('token')

      },
   
    });
    const json = await  response.json();
    console.log(json)
    setNotes(json)
  }

  // adding a note
  const addingNote = async (title, description, tag) => {
    console.log("adding the note");




    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag}),
    });
    const json = await response.json();
    console.log(json)
    const note = {
      _id: json._id,
      user: json.user,
      title: title,
      description: description,
      tag: tag,
    
      __v: 0,
    };
    setNotes(notes.concat(note));
  };

  // edit a note
  const editNote = async (id, title, description, tag) => {
    //API CALL
    console.log('ye rahi edit note funciton ki id', id)
    console.log('ye rahi edit note funciton ka title', title)
    console.log('ye rahi edit note funciton ka description', description)


    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem('token')

      },
      body: JSON.stringify({title, description, tag}),
    });
    const json =await  response.json();
    // console.log(json)
    // const newNotes = JSON.parse(JSON.stringify(notes))

    // for (let index = 0; index < newNotes.length; index++) {
    //   const element = notes[index];
    //   if (newNotes[index]._id === id) {
    //     newNotes[index].title = title;
    //     newNotes[index].description = description;
    //     newNotes[index].tag = tag;
        
    //   }
      
    // }

    const newNotes = notes.map((note)=>{
        if(note._id===id){
          console.log({...note})
          return {...note, title, description, tag}
        }
        console.log(note)
        return note;
    })
    setNotes(newNotes)
  };
  // delete a note
  const deleteNote = async(id) => {
    console.log("deleted with id", id);
try{
  const newNotes = notes.filter((note) => {
    return note._id!==id;
  });
  setNotes(newNotes);

    const response = await fetch(`${host}/api/notes/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "Application/json",
        "auth-token": localStorage.getItem('token')

      },
    
    });

    const json = await  response;
    console.log(json)
   
    
  }catch(err){
    console.log(err.message)
  }
  };


  const getusers = async() => {
   

  const response  = await  fetch(`${host}/api/auth/getusers`, {
            method: "GET",
            headers: {
              "Content-Type": "Application/json",
            }
          });
const jsonformat = await response.json();
// console.log(jsonformat)
setUserData(jsonformat)
// console.log(userData)


//      fetch(`${host}/api/auth/getusers`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "Application/json",


//       },
    
//     }).then((res)=>{
//       return res.json()
//     }).then((data)=>{
//       // console.log(data)

//       setUsers(data)
//       console.log(users)
  
     




//     }).catch((err)=>{
// console.log(err)
//     });


   

  };



  return (
    <NoteContext.Provider value={{ notes, setNotes, addingNote, deleteNote, getNotes, editNote, showAlert, alert, getusers, userData }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
