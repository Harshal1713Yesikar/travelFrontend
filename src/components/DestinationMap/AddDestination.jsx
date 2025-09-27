import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trash, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

const AddDestination = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/DestinationsBook")
      .then((res) => setBookings(res.data))
      .catch((err) => console.error(err));
  }, []);


  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(`http://localhost:3001/deleteDestination/${userId}`);
      setBookings(bookings.filter((b) => b._id !== userId));
      console.log(res)

      toast.success("Destination Deleted successfully", { position: "bottom-right" });
    } catch (error) {
      console.error("Delete error:", error);
      toast.error(error.response?.data?.msg || "Failed to delete destination", {
        position: "bottom-right",
      });
    }
  };



  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <p className="text-gray-600">No bookings yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4"
            >

              <button
                onClick={() => handleDelete(b._id)}
                className="absolute top-2 right-2  text-white rounded-full p-2 shadow-md mt-3 mr-2 hover:bg-red-600"
              >
                <Trash2 />
              </button>

              <img
                src={b.image}
                alt={b.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />

              <h3 className="text-lg font-semibold">{b.name}</h3>
              <p className="text-gray-500 text-sm mb-2">{b.location}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                {b.description}
              </p>
              <p className="mt-2 font-bold text-blue-600">₹{b.price}</p>
            </div>
          ))}
        </div>

      )}
    </div>
  );
};

export default AddDestination;
