import React from 'react'
import { useContext, useState } from 'react'

import noteContext from '../Context/notes/noteContext'

const AddNote = (props) => {

    const context = useContext(noteContext);
    const {addingNote} = context;
     const [note, setnote] = useState({title: "", description: "", tag: "default"});
    const handleClick = (e)=>{
        addingNote(note.title, note.description, note.tag)
        e.preventDefault();

        setnote({title: "", description: "", tag: ""})
        props.showAlert('Note added successfully', 'success')
    }


    const inputVal = (e)=>{
        setnote({...note, [e.target.name]: e.target.value})
    }

    
  return (
    <div className="d-flex justify-content-center">
    <form className='addnotecontainer'>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        Title
      </label>
      <input
        type="text"
        className="form-control"
        id="title"
        name='title'
        aria-describedby="emailHelp"
        onChange={inputVal}
        value={note.title}
      />
    
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">
        Description
      </label>
      <textarea
        type="text"
        className="form-control"
        id="description"
        name='description'
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
        name='tag'
        onChange={inputVal}
        value={note.tag}
      />
    </div>
   
    <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>
      Add Note
    </button>
  </form>
  </div>
  )
}

export default AddNote