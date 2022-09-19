import React, {useState} from 'react'
import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import noteContext from '../Context/notes/noteContext';
import Alert from './Alert';


const Login = (props) => {
  const context  = useContext(noteContext);
  const {alert, showAlert} = context;
     const [crediantials, setcrediantials] = useState({email: "", password: ""});
    const onChange = (e)=>{
        setcrediantials({...crediantials, [e.target.name]: e.target.value})
    }

    const navigate = useNavigate()
   
    const onSubmit = async(e)=>{
        e.preventDefault()

        try {
          
          const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "Application/json",
             
            },
            body: JSON.stringify({email: crediantials.email, password: crediantials.password})


         
          });
          const json = await  response.json();
          console.log(json)
          console.log(json.success)
          if(json.success===true){
            localStorage.setItem("token", json.jwtData)
            navigate('/')
            showAlert('logged in successfylly', 'success')
            

          }else{
            showAlert('Something went wrong ', "danger")
          }

        } catch (error) {
          showAlert('Something went wrong ', "danger")
          
        }

           }   

    
  return (

    <>
    <Alert alert={alert} />
    <div className='container logincontainer'><form>
      <h2>Log in first to get the notes</h2>
    <div className="mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
      <input type="email" className="form-control" name='email' id="email" value={crediantials.email} aria-describedby="emailHelp" onChange={onChange}/>
      <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
    </div>
    <div className="mb-3">
      <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
      <input type="password" className="form-control" name='password' value={crediantials.password} id="password" onChange={onChange}/>
    </div>
   
    <button type="submit" className="btn btn-primary" onClick={onSubmit}>Log in</button>
  </form></div>
  </>
  )
}

export default Login