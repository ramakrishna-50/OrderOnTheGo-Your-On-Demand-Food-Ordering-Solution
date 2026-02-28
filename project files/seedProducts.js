import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/product.js";
import Restaurant from "./models/restaurant.js";

dotenv.config();
await mongoose.connect(process.env.MONGO_URI);

await Product.deleteMany();

const getRestaurantId = async (name) => {
  const restaurant = await Restaurant.findOne({ name });
  return restaurant._id;
};

const seedProducts = async () => {

  const dosaHub = await getRestaurantId("Dosa Hub");
  const sriTiffins = await getRestaurantId("Sri Tiffins");
  const paradise = await getRestaurantId("Paradise Biryani");
  const andhra = await getRestaurantId("Andhra Meals House");
  const north = await getRestaurantId("North Spice");
  const chinese = await getRestaurantId("Dragon Chinese");
  const burger = await getRestaurantId("Burger Town");
  const pizza = await getRestaurantId("Italian Pizza Point");
  const cafe = await getRestaurantId("Cafe Brew");
  const ice = await getRestaurantId("Creamy Scoops");

  const products = [

  // ================= DOSA HUB =================
  { name: "Plain Dosa", price: 60, description: "Crispy golden dosa", image: "/images/plain-dosa.jpg", restaurant: dosaHub },
  { name: "Masala Dosa", price: 90, description: "Dosa stuffed with potato masala", image: "/images/masala-dosa.jpg", restaurant: dosaHub },
  { name: "Onion Dosa", price: 80, description: "Dosa topped with fresh onions", image: "/images/onion-dosa.jpg", restaurant: dosaHub },
  { name: "Ghee Dosa", price: 95, description: "Dosa roasted in pure ghee", image: "/images/ghee-dosa.jpg", restaurant: dosaHub },
  { name: "Rava Dosa", price: 100, description: "Crispy rava special dosa", image: "/images/rava-dosa.jpg", restaurant: dosaHub },
  { name: "Karam Dosa", price: 85, description: "Soft fluffy set dosa", image: "/images/Karam-dosa.jpg", restaurant: dosaHub },
  { name: "Mysore Dosa", price: 110, description: "Spicy Mysore style dosa", image: "/images/mysore-dosa.jpg", restaurant: dosaHub },
  { name: "Paneer Dosa", price: 120, description: "Dosa stuffed with paneer", image: "/images/paneer-dosa.jpg", restaurant: dosaHub },

  // ================= SRI TIFFINS =================
  { name: "Idly (2 pcs)", price: 40, description: "Soft steamed idlies", image: "/images/idly.jpg", restaurant: sriTiffins },
  { name: "Vada (2 pcs)", price: 50, description: "Crispy medu vada", image: "/images/vada.jpg", restaurant: sriTiffins },
  { name: "Poori (3 pcs)", price: 70, description: "Puffy poori with curry", image: "/images/poori.jpg", restaurant: sriTiffins },
  { name: "Upma", price: 55, description: "Traditional rava upma", image: "/images/upma.jpg", restaurant: sriTiffins },
  { name: "Pongal", price: 65, description: "Ghee pongal special", image: "/images/pongal.jpg", restaurant: sriTiffins },
  { name: "Chapathi (2 pcs)", price: 60, description: "Soft chapathi with curry", image: "/images/chapathi.jpg", restaurant: sriTiffins },
  { name: "Mini Idly", price: 50, description: "Mini idlies in sambar", image: "/images/mini-idly.jpg", restaurant: sriTiffins },
  { name: "Filter Coffee", price: 30, description: "Authentic south filter coffee", image: "/images/filter-coffee.jpg", restaurant: sriTiffins },

  // ================= PARADISE =================
  { name: "Chicken Biryani", price: 250, description: "Aromatic chicken dum biryani", image: "/images/chicken-biryani.jpg", restaurant: paradise },
  { name: "Mutton Biryani", price: 320, description: "Hyderabadi mutton biryani", image: "/images/mutton-biryani.jpg", restaurant: paradise },
  { name: "Veg Biryani", price: 180, description: "Flavorful veg dum biryani", image: "/images/veg-biryani.jpg", restaurant: paradise },
  { name: "Chicken 65", price: 220, description: "Spicy chicken starter", image: "/images/chicken-65.jpg", restaurant: paradise },
  { name: "Mutton Kebab", price: 280, description: "Juicy mutton kebab", image: "/images/mutton-kebab.jpg", restaurant: paradise },
  { name: "Double Ka Meetha", price: 120, description: "Hyderabadi dessert", image: "/images/double-ka-meetha.jpg", restaurant: paradise },
  { name: "Mirchi Ka Salan", price: 90, description: "Spicy biryani gravy", image: "/images/mirchi-salan.jpg", restaurant: paradise },
  { name: "Boiled Egg", price: 30, description: "Single boiled egg", image: "/images/boiled-egg.jpg", restaurant: paradise },
  // ===== ANDHRA MEALS =====
  { name:"Andhra Chicken Curry",price:250,description:"Spicy Andhra style chicken",image:"/images/chicken-curry.jpg",restaurant:andhra },
  { name:"Gongura Mutton Special",price:320,description:"Tangy gongura mutton",image:"/images/gongura-mutton.jpg",restaurant:andhra },
  { name:"Crispy Fish Fry",price:230,description:"Andhra fish fry",image:"/images/fish-fry.jpg",restaurant:andhra },
  { name:"Traditional Meals Plate",price:160,description:"Full Andhra meals",image:"/images/meals.jpg",restaurant:andhra },
  { name:"Pappu & Rice Combo",price:110,description:"Dal and rice",image:"/images/pappu.jpg",restaurant:andhra },
  { name:"Natukodi Pulusu",price:280,description:"Country chicken curry",image:"/images/natukodi.jpg",restaurant:andhra },
  { name:"Curd Rice Comfort",price:90,description:"Cool curd rice",image:"/images/curd-rice.jpg",restaurant:andhra },
  { name:"Tomato Pappu",price:120,description:"Tomato dal special",image:"/images/tomato-pappu.jpg",restaurant:andhra },

  // ===== NORTH SPICE =====
  { name:"Butter Chicken Supreme",price:290,description:"Creamy butter chicken",image:"/images/butter-chicken.jpg",restaurant:north },
  { name:"Paneer Butter Masala",price:230,description:"Rich paneer gravy",image:"/images/paneer-butter.jpg",restaurant:north },
  { name:"Garlic Butter Naan",price:50,description:"Soft garlic naan",image:"/images/naan.jpg",restaurant:north },
  { name:"Jeera Rice Special",price:140,description:"Cumin flavored rice",image:"/images/jeera-rice.jpg",restaurant:north },
  { name:"Dal Makhani Creamy",price:190,description:"Slow cooked dal",image:"/images/dal-makhani.jpg",restaurant:north },
  { name:"Tandoori Chicken Full",price:320,description:"Tandoor grilled chicken",image:"/images/tandoori.jpg",restaurant:north },
  { name:"Chole Bhature Classic",price:170,description:"Punjabi style chole",image:"/images/chole.jpg",restaurant:north },
  { name:"Gulab Jamun (2 pcs)",price:100,description:"Sweet dessert",image:"/images/gulab.jpg",restaurant:north },
  // ===== DRAGON CHINESE =====
{ name:"Veg Hakka Noodles", price:150, description:"Stir fried veg noodles", image:"/images/veg-hakka-noodles.jpg", restaurant:chinese },
{ name:"Chicken Schezwan Noodles", price:190, description:"Spicy schezwan noodles", image:"/images/chicken-schezwan-noodles.jpg", restaurant:chinese },
{ name:"Veg Manchurian Gravy", price:170, description:"Veg balls in spicy gravy", image:"/images/veg-manchurian.jpg", restaurant:chinese },
{ name:"Chicken Manchurian", price:210, description:"Chicken tossed in manchurian sauce", image:"/images/chicken-manchurian.jpg", restaurant:chinese },
{ name:"Egg Fried Rice", price:160, description:"Classic egg fried rice", image:"/images/egg-fried-rice.jpg", restaurant:chinese },
{ name:"Chicken Fried Rice", price:200, description:"Chinese style chicken rice", image:"/images/chicken-fried-rice.jpg", restaurant:chinese },
{ name:"Crispy Chilli Paneer", price:220, description:"Paneer in chilli sauce", image:"/images/chilli-paneer.jpg", restaurant:chinese },
{ name:"Dragon Special Combo", price:260, description:"Noodles + rice + manchurian", image:"/images/dragon-combo.jpg", restaurant:chinese },
// ===== BURGER TOWN =====
{ name:"Classic Veg Burger", price:120, description:"Veg patty burger", image:"/images/veg-burger.jpg", restaurant:burger },
{ name:"Double Cheese Burger", price:150, description:"Loaded cheese burger", image:"/images/cheese-burger.jpg", restaurant:burger },
{ name:"Crispy Chicken Burger", price:180, description:"Crispy chicken patty", image:"/images/chicken-burger.jpg", restaurant:burger },
{ name:"Zinger Loaded Burger", price:210, description:"Spicy zinger burger", image:"/images/zinger-burger.jpg", restaurant:burger },
{ name:"French Fries Medium", price:90, description:"Golden fries", image:"/images/french-fries.jpg", restaurant:burger },
{ name:"Peri Peri Fries", price:110, description:"Spicy peri peri fries", image:"/images/peri-fries.jpg", restaurant:burger },
{ name:"Chicken Nuggets (6 pcs)", price:160, description:"Crispy nuggets", image:"/images/chicken-nuggets.jpg", restaurant:burger },
{ name:"Burger Combo Meal", price:250, description:"Burger + fries + coke", image:"/images/burger-combo.jpg", restaurant:burger },
// ===== ITALIAN PIZZA POINT =====
{ name:"Margherita Classic", price:180, description:"Classic cheese pizza", image:"/images/margherita.jpg", restaurant:pizza },
{ name:"Farmhouse Veg Pizza", price:220, description:"Veg loaded pizza", image:"/images/farmhouse.jpg", restaurant:pizza },
{ name:"Chicken Tikka Pizza", price:260, description:"Indian style chicken pizza", image:"/images/chicken-tikka-pizza.jpg", restaurant:pizza },
{ name:"Pepperoni Special", price:300, description:"Pepperoni loaded pizza", image:"/images/pepperoni.jpg", restaurant:pizza },
{ name:"Cheese Burst Pizza", price:280, description:"Extra cheese burst", image:"/images/cheese-burst.jpg", restaurant:pizza },
{ name:"Garlic Bread", price:120, description:"Garlic bread sticks", image:"/images/garlic-bread.jpg", restaurant:pizza },
{ name:"Pasta Alfredo", price:200, description:"Creamy white sauce pasta", image:"/images/pasta-alfredo.jpg", restaurant:pizza },
{ name:"Italian Combo Feast", price:350, description:"Pizza + pasta + drink", image:"/images/pizza-combo.jpg", restaurant:pizza },
// ===== CAFE BREW =====
{ name:"Cold Coffee Frappe", price:140, description:"Chilled coffee frappe", image:"/images/cold-coffee.jpg", restaurant:cafe },
{ name:"Classic Cappuccino", price:110, description:"Fresh brewed cappuccino", image:"/images/cappuccino.jpg", restaurant:cafe },
{ name:"Hazelnut Latte", price:130, description:"Flavored hazelnut latte", image:"/images/latte.jpg", restaurant:cafe },
{ name:"Chocolate Brownie", price:120, description:"Warm brownie slice", image:"/images/brownie.jpg", restaurant:cafe },
{ name:"Club Sandwich", price:150, description:"Triple layer sandwich", image:"/images/club-sandwich.jpg", restaurant:cafe },
{ name:"Veg Grilled Sandwich", price:130, description:"Grilled veg sandwich", image:"/images/grilled-sandwich.jpg", restaurant:cafe },
{ name:"Oreo Milkshake", price:160, description:"Creamy oreo shake", image:"/images/oreo-shake.jpg", restaurant:cafe },
{ name:"Cafe Special Combo", price:240, description:"Sandwich + coffee", image:"/images/cafe-combo.jpg", restaurant:cafe },
// ===== CREAMY SCOOPS =====
{ name:"Belgian Chocolate Ice Cream", price:90, description:"Rich chocolate scoop", image:"/images/belgian-chocolate.jpg", restaurant:ice },
{ name:"Strawberry Delight Scoop", price:85, description:"Fresh strawberry ice cream", image:"/images/strawberry.jpg", restaurant:ice },
{ name:"Butterscotch Crunch", price:95, description:"Crunchy butterscotch scoop", image:"/images/butterscotch.jpg", restaurant:ice },
{ name:"Mango Magic Sundae", price:110, description:"Mango sundae special", image:"/images/mango-sundae.jpg", restaurant:ice },
{ name:"Choco Lava Sundae", price:130, description:"Chocolate lava sundae", image:"/images/lava-sundae.jpg", restaurant:ice },
{ name:"Vanilla Cone", price:50, description:"Classic vanilla cone", image:"/images/vanilla-cone.jpg", restaurant:ice },
{ name:"Ice Cream Family Pack", price:280, description:"Family ice cream pack", image:"/images/family-pack.jpg", restaurant:ice },
{ name:"Brownie With Ice Cream", price:150, description:"Brownie with scoop", image:"/images/brownie-icecream.jpg", restaurant:ice },

  ];

  await Product.insertMany(products);
  console.log("Products Inserted Successfully");
  process.exit();
};

seedProducts();