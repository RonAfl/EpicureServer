import chefsModel from "../../../database/models/chefsModel";

export default class chefsHandler {

  getAllChefs = () => {
    return chefsModel.find({isDeleted:false});
  }

  getWeekChef =() => {
    return chefsModel.find({isDeleted:false, weekChef:true});
  }


  getChefById = (id: any) => {
    return chefsModel.findById(id);
  }

  postChef = (newChef: any) => {
    newChef.save();
  }
  //description, image, weekChef
  updateChefNameById = async (id: string, _name: string, _description:string, _image:string, _weekChef:boolean) => {
    if(_weekChef===true){
    await chefsModel.findOneAndUpdate({ isDeleted:false, weekChef:true }, { weekChef: false }, { new: true }).exec();  
    }
    await chefsModel.findByIdAndUpdate({ _id: id }, { name: _name, description:_description, image:_image, weekChef:_weekChef }, { new: true }).exec(); 
  }

  deleteById = (id: string) => {
    chefsModel.findByIdAndUpdate({ _id: id }, { isDeleted: true }, { new: true }).exec(); 
  }
  

  getDocsByName = async (searchString: string) => {
    const docs = await chefsModel.find({ name: new RegExp(searchString, "i") });
    return docs;
  }
}