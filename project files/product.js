import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
name: String,
price: Number,
description: String,
image: String,
restaurant: {
type: mongoose.Schema.Types.ObjectId,
ref: "Restaurant"
},
type: String
}, { timestamps: true });

export default mongoose.model("Product", productSchema);