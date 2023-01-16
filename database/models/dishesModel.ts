import mongoose from 'mongoose';

const DishesSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    ingredients: { type: String, require: true },
    tags: { type: String, require: true },
    restaurant: { type: mongoose.Types.ObjectId, ref: "restaurant", require: true },
    isDeleted: { type: Boolean, default: false }
});

export default mongoose.model('Dishes', DishesSchema);
