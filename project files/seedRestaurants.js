import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "./models/restaurant.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await Restaurant.deleteMany();

const restaurants = [

{ name: "Dosa Hub", image: "/images/dosa-hub.jpg", rating: 4.4, deliveryTime: "20 mins", cuisine: "South Indian", location: "Hyderabad", type: "dosa", isVeg: true },

{ name: "Sri Tiffins", image: "/images/sri-tiffins.jpg", rating: 4.3, deliveryTime: "18 mins", cuisine: "Tiffins", location: "Hyderabad", type: "tiffin", isVeg: true },

{ name: "Paradise Biryani", image: "/images/paradise.jpg", rating: 4.6, deliveryTime: "30 mins", cuisine: "Biryani", location: "Hyderabad", type: "biryani", isVeg: false },

{ name: "Andhra Meals House", image: "/images/andhra-meals.jpg", rating: 4.5, deliveryTime: "25 mins", cuisine: "Andhra Meals", location: "Hyderabad", type: "andhra", isVeg: false },

{ name: "North Spice", image: "/images/north-spice.jpg", rating: 4.4, deliveryTime: "28 mins", cuisine: "North Indian", location: "Hyderabad", type: "north", isVeg: false },

{ name: "Dragon Chinese", image: "/images/chinese.jpg", rating: 4.2, deliveryTime: "22 mins", cuisine: "Chinese", location: "Hyderabad", type: "chinese", isVeg: false },

{ name: "Burger Town", image: "/images/burger-town.jpg", rating: 4.1, deliveryTime: "19 mins", cuisine: "Fast Food", location: "Hyderabad", type: "fastfood", isVeg: false },

{ name: "Italian Pizza Point", image: "/images/pizza.jpg", rating: 4.3, deliveryTime: "24 mins", cuisine: "Pizza", location: "Hyderabad", type: "pizza", isVeg: false },

{ name: "Cafe Brew", image: "/images/cafe.jpg", rating: 4.5, deliveryTime: "15 mins", cuisine: "Cafe", location: "Hyderabad", type: "cafe", isVeg: true },

{ name: "Creamy Scoops", image: "/images/icecream.jpg", rating: 4.6, deliveryTime: "14 mins", cuisine: "Ice Cream", location: "Hyderabad", type: "icecream", isVeg: true }

];

await Restaurant.insertMany(restaurants);

console.log("10 Restaurants Inserted");
process.exit();