import mongoose from "mongoose";
import usersModel from "../../../database/models/usersModel";

export default class usersHandler {

    getAllUsers = (_username:string) => {
        return usersModel.find({ isDeleted: false, username:_username });
    }

    postUser = (newUser: any) => {
        return newUser.save();
    }

    // getUserById=(id:string)=>{
    //     return usersModel.findById({_id:id, isDeleted: false});
    // }
}