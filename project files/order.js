import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      quantity: Number
    }
  ],
  totalAmount: Number,
  deliveryAddress: String,
  paymentMethod: String,
  orderStatus: {
    type: String,
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
