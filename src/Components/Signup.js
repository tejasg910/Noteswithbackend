import React, { useContext } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import noteContext from '../Context/notes/noteContext';
const Signup = () => {
  const [crediantials, setcrediantials] = useState({name: "", email: "", password: ""});
  const navigate = useNavigate();
  const onChange = (e)=>{
      setcrediantials({...crediantials, [e.target.name]: e.target.value})
  }

  const context = useContext(noteContext);

  const {showAlert} = context;

 
  const onSubmit = async(e)=>{
      e.preventDefault()
    const {name, email, password} = crediantials;
    console.log(email)
      const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
           
          },
          body: JSON.stringify({name, email, password})
          

       
        });
        const data = JSON.stringify({name, email, password});
        console.log(data)
        const json = await  response.json();
        console.log(json)

        if(json.success){
          localStorage.setItem("token", json)
          navigate('/login')
          showAlert('Account created successfully ', 'success')

          
        }
        else{
          showAlert('something went wrong  ', 'success')

        }
  }   
  return (
    <div className="container signupcontainer">
      <h2>Sign up from here </h2>
      <form onSubmit={onSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={crediantials.name} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" name='email' value={crediantials.email} onChange={onChange}/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name='password' value={crediantials.password} onChange={onChange}/>
  </div>
  <div className="mb-3 form-check">
    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup