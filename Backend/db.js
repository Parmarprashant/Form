// const mongoose = require("mongoose");

// const mongoURL = require('./')
// mongoose.connect(mongoURL);

// const db  = mongoose.connection;


// db.on("connected", ()=>{
//     console.log("database is connected");
// })

// db.on("disconnect", ()=>{
//     console.log("database is disconnected");
// })

// db.on("error", (err)=>{
//     console.log("Error Occurs", err)
// })

// module.exports = db;



require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch((err) => console.log(err));