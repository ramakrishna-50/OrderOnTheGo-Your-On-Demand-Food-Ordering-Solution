import express from "express";
import Restaurant from "../models/restaurant.js";
import { getRestaurantById } from "../controllers/restaurantController.js";

const router = express.Router();


// Get all restaurants
router.get("/", async (req, res) => {
  const restaurants = await Restaurant.find();
  res.json(restaurants);
});

router.get("/:id", getRestaurantById);

export default router;