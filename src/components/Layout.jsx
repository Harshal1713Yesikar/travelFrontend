import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { UserRoundCheck } from "lucide-react";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="mt-4">
      <nav>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <div className="flex-shrink-0 ml-16">
              <Link className="text-3xl font-bold text-gray-800">
                Jad
                <span className="text-orange-500 border-2 border-orange-500 rounded px-1">
                  oo
                </span>
              </Link>
            </div>


            <div className="hidden md:flex space-x-10 items-center gap-5 mr-16">
              <Link
                to="/"
                className="text-gray-700 hover:text-orange-500 transition-transform duration-300 font-medium"
              >
                Home
              </Link>

              <Link
                to="/hotelList"
                className="text-gray-700 hover:text-orange-500 transition-transform duration-300 font-medium"
              >
                Destination

              </Link>
              <Link
                to="/flight"
                className="text-gray-700 hover:text-orange-500 transition-transform duration-300 font-medium"
              >
                Flights
              </Link>
              <Link
                to="/booking"
                className="text-gray-700 hover:text-orange-500 transition-transform duration-300 font-medium"
              >
                Hotels
              </Link>
              <Link
                to="/contactUs"
                className="text-gray-700 hover:text-orange-500 transition-transform duration-300 font-medium"
              >
                Contact Us
              </Link>

              <button
                className="w-24 h-10 border border-[#FFE5BB] rounded-md text-black font-medium text-base cursor-pointer hover:bg-[#FFDDAA] focus:outline-none"
                onClick={handleLogin}
              >
                Login
              </button>


              {/* <Link
                to="/Admin"
                className=" ml-16 w-12 h-12 border border-[#FFE5BB] rounded-full text-black font-medium text-base cursor-pointer hover:bg-[#FFDDAA] flex items-center justify-center gap-2"
              >
                <UserRoundCheck size={28} strokeWidth={2.25} absoluteStrokeWidth className="ml-1" />
              </Link> */}

            </div>


            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-700 focus:outline-none"
              >
                {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
              </button>
            </div>
          </div>
        </div>


        {isOpen && (
          <div className="md:hidden bg-white shadow-md flex flex-col items-center p-5 space-y-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/hotelList"
              className="text-gray-700 hover:text-orange-500 transition-transform duration-300 font-medium"
            >
              Destination

            </Link>
            <Link
              to="/flight"
              className="block py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              Flights
            </Link>
            <Link
              to="/booking"
              className="block py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              Hotels
            </Link>
            <Link
              to="/contactUs"
              className="block py-2 text-gray-700 hover:text-orange-500"
              onClick={() => setIsOpen(false)}
            >
              Contact Us
            </Link>

            <button
              className="w-full h-10 border border-[#FFE5BB] rounded-md text-black font-medium text-base cursor-pointer hover:bg-[#FFDDAA] focus:outline-none mt-4"
              onClick={() => {
                handleLogin();
                setIsOpen(false);
              }}
            >
              Login
            </button>

            {/* <Link
              to="/Admin"
              className=" h-12 w-12 border border-[#FFE5BB] rounded-full text-black font-medium text-base cursor-pointer hover:bg-[#FFDDAA] flex justify-center items-center gap-2"
            >
              <UserRoundCheck size={28} strokeWidth={2.25} absoluteStrokeWidth className="ml-1" />
            </Link> */}
          </div>
        )}
      </nav>

      <main>{children}</main>
    </div>
  );
};

export default Layout;
