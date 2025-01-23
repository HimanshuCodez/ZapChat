import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
       
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    profilePic: {
        type: String,
        default: 'https://www.gravatar.com/avatar?d=identicon&s=200'
    },
    number:{
        type: Number,
        required: true,
        unique: true
    }
   
},
{timestamps:true})

export default mongoose.model('User', userSchema)