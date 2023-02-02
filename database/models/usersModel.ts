import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
    username: {type:String, required:true},
    password: {type:String, required:true},
    isSuper: {type:Boolean, required:true, default:false},
    isDeleted: { type: Boolean, default: false}
})

export default mongoose.model('users', UsersSchema);