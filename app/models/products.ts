import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String },
    brand: { type: String },
    model: { type: String },
    color: { type: String },
    category: { type: String },
    popular: { type: Boolean, default: false },
    discount: { type: Number, default: 0 }
});



export default mongoose.models.Product || mongoose.model('Product', productSchema);


// OverwriteModelError: Cannot overwrite `Products` model once compiled.