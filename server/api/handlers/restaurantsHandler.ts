import restaurantsModel from "../../../database/models/restaurantsModel";
// import { Response, Request } from "express"

export default class restaurantsHandler {

  getAllRestaurants = () => {
    return restaurantsModel.find({isDeleted:false});
  }

  getRestaurantById = (id: any) => {
    return restaurantsModel.findById(id);
  }

  postRestaurant = (newRestaurant: any) => {
    newRestaurant.save();
  }

  updateRestaurantNameById = (id: string, chef_name: string) => {
    restaurantsModel.findByIdAndUpdate({ _id: id }, { name: chef_name });
  }

  deleteById = (id: string) => {
    restaurantsModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true }).exec(); 
  }

  getDocsByName = (searchString: string) => {
    return restaurantsModel.find({ name: new RegExp(searchString, "i") });
  }
}