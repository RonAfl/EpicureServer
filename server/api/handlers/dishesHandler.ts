import dishesModel from "../../../database/models/dishesModel";

export default class dishesHandler {

  getAllDishes = () => {
    return dishesModel.find({ isDeleted: false }).populate("restaurant", { name: 1 });
  }

  postDish = async (newDish: any) => {
    await newDish.save();
  }

  getDishById = (id: any) => {
    return dishesModel.findById(id);
  }

  updateDishNameById = (id: string, dish_name: string, _ingredients: string, _image: string, _price: number, _tags: string, _restaurant: string) => {
    dishesModel.findByIdAndUpdate({ _id: id }, { name: dish_name, ingredients: _ingredients, image: _image, price: _price, tags: _tags, restaurant: _restaurant }, { new: true }).exec();
  }

  deleteById = (id: string) => {
    dishesModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true }).exec();
  }

  getDocsByName = (searchString: string) => {
    return dishesModel.find({ name: new RegExp(searchString, "i") });
  }
}