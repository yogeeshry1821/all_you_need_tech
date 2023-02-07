import Layout from "@/components/Layout";
import Product from "@/components/Product";
import { ProductsContext } from "@/components/ProductContext";
import { useContext, useEffect, useState } from "react";

export default function Checkout() {
  const { selectedProducts, setSelectedProducts } = useContext(ProductsContext);
  const [productsInfos, setProductsInfos] = useState([]);

  const [name, setName] = useState([]);
  const [city, setCity] = useState([]);
  const [email, setEmail] = useState([]);
  const [address, setAddress] = useState([]);
  useEffect(() => {
    const uniqueIds = [...new Set(selectedProducts)];
    fetch("/api/products?ids=" + uniqueIds.join(","))
      .then((response) => response.json())
      .then((json) => setProductsInfos(json));
  }, [selectedProducts]);

  function moreProducts(id) {
    setSelectedProducts((prev) => [...prev, id]);
  }

  const deliveryTotal = 50;

  let subTotal = 0;
  if (selectedProducts?.length) {
    for (let id of selectedProducts) {
      const price = productsInfos.find((p) => p._id === id)?.price;
      subTotal = subTotal + price;
    }
  }

  let total = deliveryTotal + subTotal;

  function lessProducts(id) {
    const pos = selectedProducts.indexOf(id);
    if (pos !== -1) {
      setSelectedProducts((prev) => {
        return prev.filter((value, index) => index !== pos);
      });
    }
  }

  return (
    <Layout>
      {!productsInfos.length && <div>no products in cart</div>}
      {productsInfos.length &&
        productsInfos.map((productInfo) => {

            const amount=selectedProducts.filter(id=>id === productInfo._id).length;
            if(amount===0){
                return;
            }
            return (
              <div className="flex mb-5" key={productInfo._id}>
            <div className="bg-gray-100 rounded-xl shrink-0">
              <img className="w-24" src={productInfo.picture} alt="/" />
            </div>
            <div className="pl-4">
              <h3 className="font-bold text-lg">{productInfo.name}</h3>
              <p className="text-sm leading-4 text-gray-500">
                {productInfo.description}
              </p>
              <div className="flex py-5">
                <div className="grow">Rs. {productInfo.price}</div>
                <div className="mx-5">
                  <button
                    onClick={() => lessProducts(productInfo._id)}
                    className="border border-gray-400 px-2 rounded-lg text-emarald-500 mx-2"
                  >
                    -
                  </button>
                  <span className="px-1">
                    {
                      selectedProducts.filter((id) => id === productInfo._id)
                        .length
                    }
                  </span>
                  <button
                    onClick={() => moreProducts(productInfo._id)}
                    className="bg-gray-400 px-2 rounded-lg text-white mx-2"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>
        )})}

      <form action="/api/checkout" method="POST">
        <div className="mt-4">
          <input
            value={name}
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg bg-gray w-full px-4 py-2  bg-gray-100 my-1"
            type="text"
            placeholder="Name"
          />
          <input
            value={city}
            name="city"
            onChange={(e) => setCity(e.target.value)}
            className="border rounded-lg bg-gray w-full px-4 py-2  bg-gray-100 my-1"
            type="text"
            placeholder="street address,number"
          />
          <input
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="border rounded-lg bg-gray w-full px-4 py-2  bg-gray-100 my-1"
            type="text"
            placeholder="city, postal code"
          />
          <input
            value={address}
            name="address"
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded-lg bg-gray w-full px-4 py-2  bg-gray-100 my-1"
            type="email"
            placeholder="email address"
          />
        </div>
        <div className="mt-4">
          <div className="flex my-3">
            <h3 className="grow text-gray-700 font-bold ">Subtotal : </h3>
            <h3 className="font-bold text-gray-900">Rs {subTotal}</h3>
          </div>
          <div className="flex my-3">
            <h3 className="grow text-gray-700 font-bold">Delivery : </h3>
            <h3 className="font-bold text-gray-900">Rs {deliveryTotal}</h3>
          </div>
          <div className="flex my-3 border-t-2 border-dashed pt-3 border-emerald-200">
            <h3 className="grow text-gray-700 font-bold">Total : </h3>
            <h3 className="font-bold text-gray-900">Rs {total}</h3>
          </div>
        </div>
        <input
          type="hidden"
          name="products"
          value={selectedProducts.join(",")}
        />
        <button
          type="submit"
          className="bg-emerald-500 p-5 text-white w-full py-2 px-2 font-bold text-lg rounded-lg shadow-md shadow-emerald-300"
        >
          {" "}
          Proceed to checkout {total}
        </button>
      </form>
    </Layout>
  );
}
