import React, { useContext, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import noteContext from '../Context/notes/noteContext';
// import { useContext } from 'react';
const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote, showAlert, setTag } = context;
  const { note, updateNote } = props;
  // console.log(note.tag.split(" "))
  let arr = note.tag.split(" ");
  arr = arr.filter((data)=>{
    return /\S/.test(data);
  });

  return (
<>
    <div className="col md-3">


      <div className="card mx-2 my-2" >
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className='card-title'>{note.title}</h5>
            <i className="fa-solid fa-trash  mx-2" onClick={() => { deleteNote(note._id); showAlert("Note deleted successfully", "success") }}></i>
            <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote() }}></i>
          </div>
          <p className='card-text'>{note.description} </p>




        </div>
   
      
    <div className="d-flex">
    {arr.map((arr) => {
        return <ul class="tags">

          <li><Link to='showtag' onClick={()=>{setTag(arr)}} class="tag">{arr}</Link></li>
        </ul>
      })}
    </div>
    </div>
    </div>
      </>

       


  )
}

export default NoteItem
