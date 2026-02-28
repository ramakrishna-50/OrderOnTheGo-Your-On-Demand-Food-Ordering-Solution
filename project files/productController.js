import Product from "../models/product.js";

// Add Product
export const addProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = new Product({
      name,
      price,
      description,
      image
    });

    await product.save();

    res.status(201).json({
      message: "Product Added Successfully",
      product
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Single Product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    res.json(product);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔥 Update Product (Admin Only)
export const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    // Update only provided fields
    if (name !== undefined) product.name = name;
    if (price !== undefined) product.price = price;
    if (description !== undefined) product.description = description;
    if (image !== undefined) product.image = image;

    const updatedProduct = await product.save();

    res.json({
      message: "Product Updated Successfully",
      updatedProduct
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Delete Product (Admin Only)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }

    await product.deleteOne();

    res.json({ message: "Product Deleted Successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

