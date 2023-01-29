import mongoose from 'mongoose';

const RestaurantsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    chef: { type: mongoose.Types.ObjectId, ref: 'chef', require: true },
    isDeleted: { type: Boolean, default: false },
    stars: {type: String, required: true}
});

export default mongoose.model('restaurant', RestaurantsSchema);