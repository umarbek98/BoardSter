import React, { useState } from "react";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";

function Banner() {
  const [currImg, setCurrImg] = useState(0);
  const data = [
    "https://img5.goodfon.com/wallpaper/nbig/f/a3/longboard-street-wallpaper-1.jpg",
    "https://wallpaperaccess.com/full/2099486.jpg",
    "https://mcdn.wallpapersafari.com/medium/51/99/jOkL69.jpg",
    "https://wallpaperaccess.com/full/5524232.jpg",
  ];

  function prevImg() {
    setCurrImg(currImg === 0 ? 3 : (prevV) => prevV - 1);
  }

  function nextImg() {
    setCurrImg(currImg === 3 ? 0 : (prevV) => prevV + 1);
  }

  return (
    <div className="w-full h-auto overflow-x-hidden">
      <div className="w-screen h-[650px] relative">
        <div
          style={{ transform: `translateX(-${currImg * 100}vw)` }}
          className="w-[400vw] h-full flex transition-transform duration-1000"
        >
          <img
            className="w-screen h-full object-cover"
            src={data[0]}
            alt="slide picture"
            loading="priority"
          />
          <img
            className="w-screen h-full object-cover"
            src={data[1]}
            alt="slide picture"
          />
          <img
            className="w-screen h-full object-cover"
            src={data[2]}
            alt="slide picture"
          />
          <img
            className="w-screen h-full object-cover"
            src={data[3]}
            alt="slide picture"
          />
        </div>
        <div className="absolute w-fit left-0 right-0 mx-auto flex gap-8 bottom-44">
          <div
            onClick={prevImg}
            className="w-14 h-12 border-[1px] border-gray-500 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowLeft />
          </div>
          <div
            onClick={nextImg}
            className="w-14 h-12 border-[1px] border-gray-500 flex items-center justify-center hover:cursor-pointer hover:bg-gray-700 hover:text-white active:bg-gray-900 duration-300"
          >
            <HiArrowRight />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
