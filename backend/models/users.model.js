const mongoose = require('mongoose');
const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    },
    password:{
        type:String,
        required:true,
    },
    avatarUrl:{
        type:String,
        required:true,
    },
    theme:{
        type:String,
        enum:['light','dark','midnight-red','abyss-blue','forest-green','nebula-purple',],
        default:'light'
    },
    isVerified:{
        type:Boolean,
        default:false
    }

},{timestamps:true});

module.exports=mongoose.model('User',UserSchema);
