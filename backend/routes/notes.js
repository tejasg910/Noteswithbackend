
const express = require('express');
const router  = express.Router();
//here we are declaring or initilazing our router for sending the response or getting data from the user side 
const Notes  = require('../models/Notes')
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult, Result } = require('express-validator');
const { findByIdAndUpdate, findById } = require('../models/User');
//get all the notes 
router.get('/fetchallnotes', fetchuser, async (req, res)=>{

    try {
        const notes  = await Notes.find({user: req.user.id})
        console.log('this is')
        res.json(notes)
        // res.json([]);
    } catch (error) 
    {
        console.log(error.message);
        res.status(500).json({error: "somenthing went wrong "})
    }

})

router.post('/addnote', fetchuser, [
    body('title', "enter title at least three charactere").isLength({min: 3}),
    body("description", "description must be at least 5 characters").isLength({min: 5})
],
 async (req, res)=>{
    try {
        const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

 
    const {title, description, tag} = req.body;

    const note  =  new Notes({
        title, description, tag, user: req.user.id
    })
    const savednote = await note.save();
    res.json(savednote)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "somenthing went wrong "})
        
    }
    

   
})


router.put('/updatenote/:id', fetchuser, async(req, res)=>{
    console.log('in put request ')
   
    try {
        const {title, description, tag} = req.body;
        const newNote = {};
        if(title){ newNote.title = title}
        if(description){ newNote.description = description}
        if(tag){ newNote.tag = tag};


        let note  = await Notes.findById(req.params.id);
        if(!note){
          return  res.status(404).json(
            {error: "not found the data "}
            )
        }
        console.log(note.user)
        console.log(note.user.toString())

        if(note.user.toString() !== req.user.id){
           return res.send('You can not allowed to change ')
        }
        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
        res.status(200).send(note)
    } catch (error) {
            res.send('server error');
            console.log(error.message)
    }


})


router.delete('/delete/:id', fetchuser, async (req, res)=>{


    

    try {
        let note =  await Notes.findById(req.params.id)

    if(!note){
       return res.status(404).send('invalid email')
    }
    if(note.user.toString()!==req.user.id){
        return res.status(404).send('this is not allowed ')
    }

//      note =  await Notes.findByIdAndDelete(req.params.id)
//   const deleted = await note.save();
//     res.status(201).send('this note has been deleted')


    Notes.findByIdAndDelete(req.params.id, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Deleted : ", docs);
        }
    });

    } catch (error) {
        res.status(500).send('internal server error', error.message)
    }
})

module.exports = router;

//here we have exported the data from the server through our router 