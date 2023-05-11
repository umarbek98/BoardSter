import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { makeLogoutRequest } from "../redux/loginSlice";

function Profile() {
  const userId = useSelector((state) => state.login.user?.userId || "");
  const [userOrder, setUserOrders] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userId) {
      axios
        .get(`/orders/${userId}`)
        .then((resp) => setUserOrders(resp.data.orders))
        .catch((error) => console.error(error));
    }
  }, [userId]);

  function handleLogout() {
    dispatch(makeLogoutRequest());
    window.location.href = "/";
  }

  return (
    <div className="max-w-screen-xl mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-2/3">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Orders:</h2>
            {userOrder.map((order, index) => (
              <div key={index} className="border border-gray-300 p-4 mb-4">
                <h2 className="text-lg font-bold mb-2">Order {index + 1}</h2>
                <ul>
                  {order.map((item) => (
                    <li key={item._id} className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h3 className="font-bold">{item.title}</h3>
                        <p className="text-gray-500">{item.description}</p>
                        <p className="text-gray-500">
                          Price: ${item.price} | Quantity: {item.quantity}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="bg-black text-white py-2 px-4 hover:bg-gray-800"
      >
        Logout
      </button>
    </div>
  );
}

export default Profile;
