
import mongoose from 'mongoose';
// import generate  from'../../../helpers/generateRDString' 

const userSchema = new mongoose.Schema({
    fullName: String,
    password:String,
    email: String ,
    token: String,
    deleted: {
        type : Boolean,
        default : false
    },
    deletedAt : Date
},
{
    timestamps : true
}

);
const user = mongoose.model('user', userSchema , 'users');

export default  user;
