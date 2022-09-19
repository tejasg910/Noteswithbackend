
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
//here we are declaring or initilazing our router for sending the response or getting data from the user side 
const { body, validationResult, Result } = require('express-validator');

const bcrypt  = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const JWT_SECRET = "Tejasgiriisagoodguy"
const User = require('../models/User')

const fetchuser = require('../middleware/fetchuser')
router.post('/createuser', [
  //and here we are acutally verifying the data from the user 
  body('email').isEmail(),
  body('password', "Please follow the rules for the password").isLength({ min: 5 }),
  body('name', "name should be more than three characters").isLength({ min: 5 }),
],
  async (req, res) => {

 let success = false;
    //this for checking errors from client side  
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(),  });
    }

    // }

    //we are adding our code in try and catch block for error handeling 
    try {

      //checking weather the user exists or not!
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        //if user exists then just returning the error 
        return res.status(400).json({ error: "This email is already taken!",  })
      }
      const genSalt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(req.body.password, genSalt);
      user = await User.create({


        name: req.body.name,
        password: hashPassword,
        email: req.body.email
      })
      const data = {
          user:{
            id: user.id
          }
        }

  const jwtData =     jwt.sign(data, JWT_SECRET)
  console.log(jwtData)
        success = true;
      res.status(201).send({jwtData, success})

    } catch (error) {
      console.log('something went wrong ');
      res.status(500).send("Something went wrong ", )
    }


  })



  //creating the our second route for the login

router.post('/login', [
  //verifying the data entered by the user 
  body('email', "enter valid email").isEmail(),
  body("password", "Password can not be blank").exists()
], async (req, res)=>{
  let success  = false;
  //actually verifying the data by the user 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() , success});
  }


  try {
    //destructuring the data from the req.body 
    const {email, password} = req.body;
    //getting the email from the database 
    let user  = await User.findOne({email});
    if(!user){
      //immediately sending the bad request for the invalid email
      return res.status(400).json({error: "Please enter valid details", success})
    }
    //yaha par ham apne password ko compare kar rahe hai 
    //aur ye kaise ho raha hai iski chinta mat karo 
    const passwordCompare = await bcrypt.compare(password, user.password);


    if(!passwordCompare){
      //agar password galat hai to ye error bhej rahe hai 
      return res.status(400).json({error: "Please enter valid details", success})
    }
//yaha par firse token generate kar rahe hai 
    const data = {
      user:{
        id: user.id
      }
    }
const jwtData = jwt.sign(data, JWT_SECRET);
//and this is our final response 
success = true;
res.json({jwtData, success})
  }catch (error) {
    console.log('kuch to gadbad hai daya ', error.message);
    
    res.status(500).send("Something went wrong ", success)
  }
  

  
})


//creating the third route for the data of the users in the database 

router.get('/getdata', fetchuser, async (req, res)=>{

  try {
    const userId = req.user.id;
  const userData = await User.findOne({userId}).select("-password");
  res.send(userData)
  } catch (error) {

    console.log(error.message)
    
  }
  
})
module.exports = router;

//here we have exported the data from the server through our router 