import mongoose from "mongoose";
import restaurantsModel from "../../../database/models/restaurantsModel";

interface Restaurant {
  _id: mongoose.Types.ObjectId;
  name:string;
  image:string;
  isDeleted: boolean;
  chef: mongoose.Types.ObjectId;
}

export default class restaurantsHandler {

  getAllRestaurants = () => {
    return restaurantsModel.find({isDeleted:false}).populate("chef", {name: 1});
  }

  getAllWeekChefRestaurants = (id:string) => {
    return restaurantsModel.find( {isDeleted:false, chef:id});
  }

  getRestaurantById = (id: any) => {
    return restaurantsModel.findById(id);
  }
  getchefRestaurantById = (id: any) => {
    return restaurantsModel.findById(id).populate("chef");
  }
  postRestaurant = (newRestaurant: any) => {
    newRestaurant.save();
  }

  updateRestaurantNameById = (id: string, chef_name: string, stars:string, chef:string) => {
    restaurantsModel.findByIdAndUpdate({ _id: id }, { name: chef_name, stars:stars, chef:chef }, { new: true }).exec();
  }

  deleteById = (id: string) => {
    restaurantsModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true }).exec(); 
  }

  getDocsByName = (searchString: string) => {
    return restaurantsModel.find({ name: new RegExp(searchString, "i") });
  }
}
