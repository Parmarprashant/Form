const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET","POST","PUT","DELETE","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"]
}));



app.use(express.json());

const db = require('./db');
const Users = require('./models/User');

app.get('/users', async (req, res)=>{
    const data = await Users.find();
    res.status(200).json(data);
});

app.post('/users', async (req,res)=>{
   try{

      console.log("Incoming data:", req.body);

      const {username, phone, password, confirmPassword} = req.body;


      const user = new Users({username, phone, password});
      const savedUser = await user.save();

      res.status(201).json(savedUser);

   }catch(err){
      console.error("SERVER ERROR:", err);
      res.status(500).json({error: err.message});
   }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});