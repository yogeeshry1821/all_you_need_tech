import { useEffect } from "react";
import { useState } from "react";
import Product from "@/components/Product";
import { initMongoose } from "@/lib/mongoose";
import { findAllProducts } from "./api/products";
import Layout from "@/components/Layout";

export default function Home({ products }) {
  const [phrase, setPhrase] = useState("");
  
  const categoryName = [...new Set(products.map((p) => p.category))];
  if (phrase) {
    products = products.filter((p) => p.name.toLowerCase().includes(phrase));
  }

  return (
    <Layout>
      <input
        value={phrase}
        onChange={(e) => setPhrase(e.target.value)}
        type="text"
        placeholder="Search for anything here... "
        className="bg-gray-50 w-50 mx-5 py-3 px-3 rounded-xl"
      />
      <div>
        {categoryName.map((categoryName) => (
          
          <div key={categoryName}>
            {products.find((p) => p.category === categoryName) && (
              <div>
                <h2 className="text-2xl capitalize p-4">{categoryName}</h2>
                <div className="flex px-5 mx-5">
                  {products
                    .filter((p) => p.category === categoryName)
                    .map((productInfo) => (
                      <div key={productInfo._id} className="-mx-5 px-10">
                        <Product {...productInfo} />
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  await initMongoose();
  const products = await findAllProducts();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
