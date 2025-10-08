import React, { useState } from 'react';
import { Heart, Star, MapPin,CircleX } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useLanguage } from '../contexts/LanguageContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const DestinationCard = ({ destination }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage()

    const [isOpen, setIsOpen] = useState(false); 
  const [showDetails, setShowDetails] = useState(false); 

  const confirmSave = () => {
      const sound = new Audio('/click-sound.mp3');
  sound.play();
    console.log("Booking confirmed for:", destination.name);
    handleAdd();
    setIsOpen(false);
  };
  



  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: destination.id,
      name: destination.name,
      image: destination.image,
      price: destination.price,
      rating: destination.rating,
      type: destination.type
    };

    if (isInWishlist(destination.id)) {
      removeFromWishlist(destination.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

const handleAdd = async () => {
  const bookingData = {
    destinationId: destination.id,
    name: destination.name,
    image: destination.image,
    description: destination.description,
    price: destination.price,
    rating: destination.rating,
    location: destination.location
  };

  try {
    // const res = await axios.post("http://localhost:3001/api/bookings", bookingData);
 const res = await axios.post(
    `${process.env.REACT_APP_Backend_URL}/api/bookings`,
    bookingData, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
    console.log("Saved:", res.data);
          toast.success("🎉 Destination Add successfully!", { position: "bottom-right" });
    
  } catch (error) {
    console.error(error);
    toast.error(
      error.response?.data?.message || "Something went wrong!",
      { position: "bottom-right" }
    );
  }
};

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-200 ${
              isInWishlist(destination.id)
                ? "text-red-500 fill-red-500"
                : "text-gray-600 dark:text-gray-400"
            }`}
          />
        </button> */}

        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          ₹{destination.price.toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {destination.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {destination.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{destination.location}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex space-x-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 px-4 py-2 bg-gradient-to-r bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300 transform hover:scale-105 font-medium"
          >
            {t("book.now")}
          </button>

          <button
            onClick={() => setShowDetails(true)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
          >
            {t("view.details")}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-80">
            <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">
              Confirm Booking
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Are you sure you want to save this booking?
            </p>
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmSave}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white"
              >
                Yes, Save
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg max-w-md w-full relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-7 right-7 text-white-500 hover:text-red-500 text-xl"
            >
              <CircleX />
            </button>
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-56 object-cover rounded-lg mb-4"
            />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-2">
              {destination.name}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{destination.location}</p>
            <p className="text-gray-700 dark:text-gray-400 mb-4">{destination.description}</p>
            <p className="font-semibold text-blue-600">₹{destination.price}</p>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default DestinationCard;
