import React from 'react'

const Allusers = (props) => {
  return (
   <div className='container d-flex  allusercontainer'>
    <div className="d-flex info">
    <p className='mx-2 my-0 name'>{props.name.toUpperCase()}</p>
    <p className='mx-2 my-0 email' >{props.email}</p>
    </div>
    <div className="date">
      <p>Joined on: {props.date}</p>
    </div>
   

   </div>
  )
}

export default Allusers