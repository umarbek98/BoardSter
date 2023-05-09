import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { avatarImg } from "../assets";
import { useState } from "react";

function Profile() {
  const user = useSelector((state) => state.login.user);
  // console.log("the user:" + JSON.stringify(user));
  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/5">
          <img
            className="w-full h-auto rounded-full"
            src={avatarImg}
            alt="Profile Avatar"
          />
        </div>
        <div className="w-full md:w-2/3">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Name:</h2>
            <p>name</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Email:</h2>
            <p></p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Address:</h2>
            <p>phone</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Phone:</h2>
            <p>phone</p>
          </div>
          <div className="mb-4">
            <h2 className="text-lg font-bold">Orders:</h2>
            <ul>
              {/* {user.orders.map((order) => (
                <li key={order.id}>
                  <Link to={`/order/${order.id}`}>{order.id}</Link>
                </li>
              ))} */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
