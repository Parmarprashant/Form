const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const db = require('./db')
const Users = require('./models/User')


app.get('/users', async (req, res)=>{
    const data = await Users.find()
    res.status(201).json(data);
})

app.post('/users', async (req, res)=>{
   try{
     const fData = req.body;

     const user = new Users(fData);
     const gResponse = await user.save();
     console.log("data saved of user");
     res.status(200).json(gResponse);
   }
   catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"})
    }
})


app.listen(3000, ()=>{
    console.log("server is running the port 3000");
})