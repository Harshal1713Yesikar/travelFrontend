import React, { useState } from "react";
import { Link } from "react-router-dom";

const HotelDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="relative">

      <button
        onClick={toggleDropdown}
        onMouseEnter={() => setIsOpen(true)}
        className="text-gray-700 hover:text-orange-500 font-medium focus:outline-none"
      >
        Hotels
      </button>
      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-40 "
          onMouseLeave={() => setIsOpen(false)} 
        >
          <ul className="py-2">
            <li>
              <Link
                to="/hotelList?type=luxury"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // ✅ Close on click
              >
                Luxury Hotels
              </Link>
            </li>
            {/* <li>
              <Link
                to="/hotelList?type=budget"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // ✅ Close on click
              >
                Budget Hotels
              </Link>
            </li>
            <li>
              <Link
                to="/hotelList?type=beach"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-200"
                onClick={() => setIsOpen(false)} // ✅ Close on click
              >
                Beach Resorts
              </Link>
            </li> */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default HotelDropdown;
