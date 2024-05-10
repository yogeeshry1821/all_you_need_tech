import { initMongoose } from "@/lib/mongoose";
import Product from "../../models/Product";

export async function findAllProducts() {
  try {
    const products=await Product.find({}).exec();
    console.log('products', products)
    return products;
 } catch (error) {
   console.error("Error fetching products:", error.message);
   throw error; 
 }
}

export default async function handle(req, res) {
  console.log("ooooo")
  await initMongoose();
  const { ids } = req.query;
  console.log('req.query', req.query)
  if (ids) {
    const idsArray = ids.split(",");
    // console.log(idsArray);
    res.json(
      await Product.find({
        '_id': { $in:idsArray },
      }).exec()
    );
  } else {
    res.json(await findAllProducts());
  }
}
