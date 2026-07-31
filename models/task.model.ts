
import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    title: String ,
    status : String ,
    content : String ,
    timeStart : Date,
    timeFinish : Date,
    createdBy : String,
    listUser : Array,
    taskParentId : String , 
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
const task = mongoose.model('task', taskSchema , 'tasks');

export default task;
