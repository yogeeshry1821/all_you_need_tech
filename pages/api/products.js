import { initMongoose } from "@/lib/mongoose";
import Product from "../../models/Product";

export async function findAllProducts() {
  try {
    const products=await Product.find({}).exec();
    return products;
 } catch (error) {
   console.error("Error fetching products:", error.message);
   throw error; 
 }
}

export default async function handle(req, res) {
  await initMongoose();
  const { ids } = req.query;
  if (ids) {
    const idsArray = ids.split(",");
    res.json(
      await Product.find({
        '_id': { $in:idsArray },
      }).exec()
    );
  } else {
    res.json(await findAllProducts());
  }
}
