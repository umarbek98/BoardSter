import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import { ToastContainer, toast } from "react-toastify";
import StripChekout from "react-stripe-checkout";
import axios from "axios";
import { resetCart } from "../redux/shopsterSlice";

const Cart = () => {
  const productData = useSelector((state) => state.shopster.productData);
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const userData = useSelector((state) => state.login.user);
  const [totalPrice, setTotalPrice] = useState("");
  const [payNow, setPayNow] = useState(false);

  const disptach = useDispatch();

  const payment = async (token) => {
    const resultFromCharge = await axios.post("http://localhost:5000/pay", {
      amount: totalPrice * 100,
      token: token,
    });
    if (resultFromCharge.data.result.status === "succeeded") {
      orderHistory();
      disptach(resetCart());
      window.location.href = "/profile";
    }
  };

  async function orderHistory() {
    const data = {
      products: productData.map((item) => item),
      userId: userData.userId,
    };
    console.log(data);
    await axios.post("/orders", data);
  }

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

  function handleCheckout() {
    if (isLoggedIn) {
      setPayNow(true);
    } else {
      toast.error("Please sign in to Checkout");
    }
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
          <button
            onClick={handleCheckout}
            className="text-base bg-black text-white w-full py-3 mt-6 hover:bg-gray-800 duration-300 cursor-pointer"
          >
            proceed to checkout
          </button>
          {payNow && (
            <div className="w-full mt-6 flex items-center justify-center">
              <StripChekout
                stripeKey="pk_test_51N5amuFMuxCJZwwmp2OZNpo7ssY0u31AyQ8AK0QItsB70ypprKEJRsqFj7EgqN7I3bKg0WeAG7uclfOulsHSLGvj00Mysa5tx4"
                name="ShopSter Online Store"
                amount={totalPrice * 100}
                label="Pay to shopster"
                description={`Your Payment amount is ${formatCurrency(
                  totalPrice
                )}`}
                token={payment}
                email={userData}
              />
            </div>
          )}
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
