import chefsModel from "../../../database/models/chefsModel";

export default class chefsHandler {

  getAllChefs = () => {
    return chefsModel.find({isDeleted:false});
  }

  getChefById = (id: any) => {
    return chefsModel.findById(id);
  }

  postChef = (newChef: any) => {
    newChef.save();
  }

  updateChefNameById = (id: string, chef_name: string) => {
    chefsModel.findByIdAndUpdate({ _id: id }, { name: chef_name }, { new: true }).exec(); 
  }

  deleteById = (id: string) => {
    chefsModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true }).exec(); 
  }
  

  getDocsByName = async (searchString: string) => {
    const docs = await chefsModel.find({ name: new RegExp(searchString, "i") });
    return docs;
  }
}