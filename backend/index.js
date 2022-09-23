const express = require('express')
var cors = require('cors')

require('./db')
// const mongoose  = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/test');
// connectToMongo();
const app = express();
app.use(express.json())
app.use(cors())
const port  =  5000;

app.get('/', (req, res)=>{
    res.send("hello bhai");
})



//here we are setting the main routes in the main index js file 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))


app.listen(port, ()=>{
    console.log(`server started at ${port}`)
})