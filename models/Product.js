import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  picture: String,
});

const Product =
  mongoose.models.Product || mongoose.model("Product", ProductSchema);

// Accessing the database name

export default Product;
