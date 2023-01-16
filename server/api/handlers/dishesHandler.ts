import dishesModel from "../../../database/models/dishesModel";

export default class dishesHandler {

  getAllDishes = () => {
    return dishesModel.find({isDeleted:false});
  }

  postDish = async (newDish: any) => {
    await newDish.save();
  }

  getDishById = (id: any) => {
    return dishesModel.findById(id);
  }

  updateDishNameById = (id: string, dish_name: string) => {
    dishesModel.findByIdAndUpdate({ _id: id }, { name: dish_name });
  }

  deleteById = (id: string) => {
    dishesModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true }).exec(); 
  }

  getDocsByName = (searchString: string) => {
    return dishesModel.find({ name: new RegExp(searchString, "i") });
  }
}