import { useContext } from "react";
import { ProductsContext } from "./ProductContext";

export default function Product({_id,name,price,description,picture}) {
  const {setSelectedProducts}=useContext(ProductsContext);
  function addProduct(){
    setSelectedProducts(prev=>[...prev,_id]);
  }
  return (
    <div className="w-64">
      <div className="bg-gray-300 p-5 rounded-xl">
        <img src={picture} />
      </div>
      <div className="mt-2">
        <h3 className="font-bold text-lg capitalize">{name}</h3>
      </div>
      <p className="text-sm mt-2 leading-4">{description}</p>
      <div className="flex mt-1">
        <div className="text-sm font grow my-3">Rs.{price}</div>
        <button onClick={addProduct} className=" bg-gray-200 rounded-xl text-black px-2 py-1 my-4">
          add to cart
        </button>
      </div>
    </div>
  );
}
