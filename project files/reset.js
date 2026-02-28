import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/restaurant.js";
import Product from "./models/product.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await Restaurant.deleteMany();
await Product.deleteMany();

console.log("Database Cleared");
process.exit();