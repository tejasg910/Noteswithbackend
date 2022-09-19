import React from "react";
import { useContext, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import noteContext from "../Context/notes/noteContext";
import NoteItem from "./NoteItem";
const Notes = () => {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote, showAlert } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const navigate = useNavigate();

  const [note, setnote] = useState({id: "", title: "", description: "", tag: "default"});
  const updateNote= (currNote)=>{

    ref.current.click();
    setnote({id: currNote._id, title: currNote.title, description: currNote.description, tag: currNote.tag})
    console.log(currNote)
    
    // editNote(currNote._id,  currNote.title,  currNote.description,  currNote.tag)
    
  }
  
  
  
  const handleClick = (e)=>{
   
    e.preventDefault();
    console.log("note is updated....", note.id)
    editNote(note.id, note.title,  note.description, note.tag)
    refClose.current.click();
    showAlert("Notes updated successfully", "success")


}


const inputVal = (e)=>{
    setnote({...note, [e.target.name]: e.target.value})
}

  useEffect(() => {
    if(localStorage.getItem('token'))
    {
      getNotes();

    }else{
      navigate('/login')
    }
  }, []);
  return (
    <div className="row my-3">
      <button
        type="button"
        className="btn btn- d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    aria-describedby="emailHelp"
                    onChange={inputVal}
                    value={note.title}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="description"
                    name="description"
                    onChange={inputVal}
                    value={note.description}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="tag"
                    name="tag"
                    onChange={inputVal}
                    value={note.tag}
                  />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2>Your Notes</h2>

      <div className="container">
        {notes.length===0 && "Nothing to display"}
      </div>
      {notes.map((note) => {
        return <NoteItem key={note._id} note={note} updateNote={()=>{updateNote(note)}}/>;
      })}
    </div>
  );
};

export default Notes;
