import mongoose from 'mongoose';

const RestaurantsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    chef: { type: mongoose.Types.ObjectId, ref: 'Chef', require: true },
    isDeleted: { type: Boolean, default: false }
});

export default mongoose.model('Restaurants', RestaurantsSchema);

