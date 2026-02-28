import Order from "../models/order.js";
import Product from "../models/product.js";
import mongoose from "mongoose";

// Create Order
export const createOrder = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({ message: "No products in order" });
    }

    let totalPrice = 0;

    for (let item of products) {

      if (!item.product) {
        return res.status(400).json({ message: "Product ID missing" });
      }

      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        return res.status(400).json({ message: "Invalid product ID" });
      }

      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      if (!item.quantity || item.quantity <= 0) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      totalPrice += product.price * item.quantity;
    }

    const order = new Order({
      user: req.user.id,
      products,
      totalPrice
    });

    await order.save();

    res.status(201).json({
      message: "Order Placed Successfully",
      order
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// Get My Orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate("products.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Get All Orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("products.product");

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Admin: Update Order Status
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;

    await order.save();

    res.json({
      message: "Order status updated successfully",
      order
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};