const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    Phone:{
        type: String,
        required: true
    },
    password:{
        type: String
    },
    ConfirmPassword:{
      type: String
    }
})

const Users = mongoose.model("Users", userSchema);
module.exports  = Users