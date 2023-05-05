import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";

const Cart = () => {
  const productData = useSelector((state) => state.shopster.productData);
  const [totalPrice, setTotalPrice] = useState("");
  useEffect(() => {
    let price = 0;
    productData.map((item) => {
      price += item.price * item.quantity;
      return price;
    });
    setTotalPrice(price);
  }, [productData]);

  function formatCurrency(price) {
    const formattedCurrency = price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return formattedCurrency;
  }

  return (
    <div>
      <div className="max-w-screen-xl mx-auto py-20 flex">
        <CartItem />
        <div className="w-1/3 bg-[#fafafa] py-6 px-4">
          <div className="flex flex-col gap-6 border-b-[1px] border-b-gray-400 pb-6">
            <h2 className="text-2xl font-medium">cart total:</h2>
            <p className="flex items-center gap-4 text-base">
              SubTotal
              <span className="font-bold text-lg">
                {formatCurrency(totalPrice)}
              </span>
            </p>
            <p className="flex items-center gap-4 text-base">
              Shipping:<span>123 BayParkway, Brooklyn, NY 11223</span>
            </p>
          </div>
          <p className="font-titleFont font-semibold flex justify-between mt-6">
            Total:{" "}
            <span className="text-xl font-bold">
              {formatCurrency(totalPrice)}
            </span>
          </p>
          <button className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300 cursor-pointer">
            proceed to checkout
          </button>
        </div>
      </div>
      <ToastContainer
        position="top-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default Cart;
