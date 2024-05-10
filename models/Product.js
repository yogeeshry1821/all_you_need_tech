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
const databaseName = mongoose.connection.db;
console.log("Database Name:", databaseName);

export default Product;
