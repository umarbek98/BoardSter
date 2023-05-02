import React from "react";

function ProductsCard({ product }) {
  const { image, title, price, category } = product;

  const shortenedTitle =
    title.substring(0, 17) + (title.length > 15 ? "..." : "");

  function formatCurrency(price) {
    const formattedCurrency = price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
    return formattedCurrency;
  }

  return (
    <div className="group border-[1px]">
      <div className="w-full h-96 cursor-pointer overflow-hidden">
        <img
          className="w-full h-full group-hover:scale-110 duration-500"
          src={image}
          alt={title}
        ></img>
      </div>
      <div className="w-full border-t-[1px] px-2 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-base font-bold">{shortenedTitle}</h2>
          </div>
          <div className="justify-end flex gap-2 relative overflow-hidden w-28">
            <div className="flex gap-2 transform group-hover:translate-x-24 transition-transform duration-500">
              <p className="font-semibold">{formatCurrency(price)}</p>
            </div>
            <p className="absolute z-20 w-[100px] text-gray-500 hover:text-gray-900 flex items-center gap-1 top-0 transfrom -translate-x-32 group-hover:translate-x-0 transition-transform cursor-pointer duration-500">
              add to cart
            </p>
          </div>
        </div>
        <div>
          <p>{category}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductsCard;
