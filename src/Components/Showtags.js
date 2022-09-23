
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import noteContext from '../Context/notes/noteContext'
import NoteState from '../Context/notes/NoteState';
const Showtags = () => {
     const context = useContext(noteContext);
     const {notes , tag} = context;
     const tagData = notes.filter((data)=>{
        
        return data.tag.includes(tag)
      
     })
     console.log(tagData)
     console.log(tag)

  return (
   <>
   {tagData.map((data)=>{
    return (
        <div className="col md-3">


        <div className="card mx-2 my-2" >
          <div className="card-body">
            <div className="d-flex align-items-center">
              <h5 className='card-title'>{data.title}</h5>
             
              {/* <i className="fa-solid fa-pen-to-square mx-2" onClick={() => { updateNote() }}></i> */}
            </div>
            <p className='card-text'>{data.description} </p>

  
  
  
          </div>
     
        
      <div className="d-flex showtagsback">
      <Link className='link' to="/">Go Back</Link>
      </div>
      </div>
      </div>
    )
   })}
   </>
  )
}

export default Showtags