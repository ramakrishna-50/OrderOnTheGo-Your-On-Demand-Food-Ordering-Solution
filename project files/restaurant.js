import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  rating: Number,
  deliveryTime: String,
  cuisine: String,
  location: String,
  type: { type: String, required: true },
  isVeg: Boolean,
  isOpen: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model("Restaurant", restaurantSchema);