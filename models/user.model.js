const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
username: {type: String, 
    lowercase: true, 
    required: [true, "can't be blank"], 
    match: [/^[a-zA-Z0-9]+$/, 'is invalid'],
     index: true},
 email: {type: String, 
    lowercase: true, 
    required: [true, "can't be blank"], 
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true},
password: {type: String, 
    required: [true, "can't be blank"], 
       min:[ 8,"needs to be atleast 8 characters"]
        },
  passwordcheck:String,
  fullname: String,
  lastname: String,
  
}, {timestamps: true});

module.exports=User =mongoose.model("user",userSchema);