import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/notes/NoteState";
import Alert from "./Components/Alert";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import { useState } from "react";
import noteContext from "./Context/notes/noteContext";
import { useContext } from "react";
import Users from "./Components/Users";
import Showtags from "./Components/Showtags";

function App() {

  const context = useContext(noteContext);
//  const {tag} = context;
  return (
    <>
     <NoteState>
      <Router>
        <Routes>
          
          <Route path="/" element={<Navbar />}>
           
            <Route index element={<Home />} />
               <Route path="about" element={<About />} />
               <Route path="login" element={<Login />} />
               <Route path="signup" element={<Signup  />} />
               <Route path="users" element={<Users  />} />
               <Route path='showtag' element={<Showtags  />} />



               
          </Route>
        </Routes>
      </Router>
      </NoteState>
    </>
  );
}

export default App;
