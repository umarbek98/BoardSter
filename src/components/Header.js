import React from "react";
import { cartImg, logo, userLogo } from "../assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {
  const productData = useSelector((state) => state.shopster.productData);
  const listTailStyle =
    "text-base text-black font-bold hover:text-orange-900 hover:underline underline-offset-2 decoration-[1px] cursor-pointer duration-300";

  return (
    <div className="w-full h-20 bg-white border-b-[1px] border-b-gray-800 sticky top-0 z-50">
      <div className="max-w-screen-xl h-full mx-auto flex items-center justify-between">
        <Link to="/">
          <div>
            <img className="w-28" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="flex items-center gap-8">
          <ul className="flex items-center gap-8">
            <li className={listTailStyle}>Home</li>
            <li className={listTailStyle}>Pages</li>
            <li className={listTailStyle}>Shop</li>
            <li className={listTailStyle}>Element</li>
            <li className={listTailStyle}>Blog</li>
          </ul>
          <Link to="/cart">
            <div className="relative">
              <img className="w-10" src={cartImg} alt="Cart Logo" />
              <span className="absolute w-6 top-3.5 left-2 text-sm flex items-center justify-center">
                {productData.length}
              </span>
            </div>
          </Link>
          <Link to="/login">
            <img
              className="w-8 h-8 rounded-full"
              src={userLogo}
              alt="user logo"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
