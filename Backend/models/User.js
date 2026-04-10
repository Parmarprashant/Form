const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        require: true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        
    }
});

const Users = mongoose.model("Users", userSchema);

module.exports = Users;