const mongoose = require("mongoose");

const mongoURL = 'mongodb+srv://prashantparmar9919_db_user:K612joyu@cluster0.hshdjpt.mongodb.net/UserDetails?retryWrites=true&w=majority'

mongoose.connect(mongoURL);

const db  = mongoose.connection;


db.on("connected", ()=>{
    console.log("database is connected");
})

db.on("disconnect", ()=>{
    console.log("database is disconnected");
})

db.on("error", (err)=>{
    console.log("Error Occurs", err)
})

module.exports = db;