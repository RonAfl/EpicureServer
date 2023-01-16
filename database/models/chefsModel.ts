import mongoose from 'mongoose';

const ChefsSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, require: true },
    isDeleted: { type: Boolean, default: false }
});

export default mongoose.model('Chefs', ChefsSchema);