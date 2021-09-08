import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  user_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  reference: { type: String, required: true, unique: true },
  category: {
    type: String,
    enum: ["Gardning", "DIY", "Plombry", "Electricity", "Painting", "Lighting"],
  },
  pricePerDay: { type: Number, required: true },
  images: {
    img1: String,
    img2: String,
    img3: String,
    img4: String,
  },
  description: { type: String, maxlength: 200 },
  tutorial: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, default: 0 },
});
const Product = mongoose.model("Product", ProductSchema);

export default Product;
