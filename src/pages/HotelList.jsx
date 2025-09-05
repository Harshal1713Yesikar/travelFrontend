import React from "react";
import { Link } from "react-router-dom";
import useScrollAnimation from "../useScrollAnimation";
import SplashCursor from "../components/nurui/splash-cursor";

const hotels = [
  { id: 1, name: "Grand Palace Hotel", location: "Paris, France", price: "$120/AfterNoon", image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 2, name: "Seaside Resort", location: "Maldives", price: "$250/night", image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, name: "Mountain Lodge", location: "Switzerland", price: "$180/FullDay", image: "https://images.pexels.com/photos/261395/pexels-photo-261395.jpeg?auto=compress&cs=tinysrgb&w=600" },
  { id: 3, name: "TajHotel", location: "India", price: "2000Rs/night", image: "https://images.pexels.com/photos/19867661/pexels-photo-19867661/free-photo-of-taj-mahal-palace-in-mumbai.jpeg?auto=compress&cs=tinysrgb&w=600" },

];

const HotelList = ({ onSelectHotel }) => {
  useScrollAnimation()


  return (

    <>
    <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12">
  <h2 className="text-[#14183E] text-3xl md:text-5xl font-bold font-inika text-center mb-10">
    Available Hotels
  </h2>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {hotels.map((hotel) => (
      <div
        key={hotel.id}
        className="shadow-lg rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
      >
        <img
          src={hotel.image}
          alt={hotel.name}
          className="w-full h-64 sm:h-72 md:h-80 object-cover animate-on-scroll"
        />
        <div className="p-4 text-center">
          <h3 className="text-xl font-bold">{hotel.name}</h3>
          <p className="text-gray-600">{hotel.location}</p>
          <p className="text-blue-600 font-semibold">{hotel.price}</p>
        </div>
      </div>
    ))}
  </div>
</div>


      <div className="bg-gray-100 py-16  px-6 mt-16 sm:px-12 lg:px-16">
        <div className="flex flex-col md:flex-row justify-center gap-12 md:gap-24 mt-12 animate-on-scroll">
          <div className="text-center md:text-left">
            <p className="font-poppins font-semibold text-4xl">Jaddoo.</p>
            <p className="w-full md:w-64 text-[#5E6282] mt-7 font-normal">
              Book your trip in minutes and get full control for much longer.
            </p>
          </div>


          <div>
            <p className="font-bold text-2xl">Company</p>
            <div className="mt-7 space-y-2">
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/hotelList">
                  Hotel
                </Link>
              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">

                <Link to="/flight">
                  Flights
                </Link>
              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/booking">
                  Bookings
                </Link>
              </p>
            </div>
          </div>


          <div>
            <p className="font-bold text-2xl">Contact</p>
            <div className="mt-7 space-y-2">
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/sighup">
                  Sign up
                </Link>
              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/login">
                  Login
                </Link>

              </p>
              <p className="text-slate-600 font-bold font-poppins cursor-pointer hover:text-orange-500 transition-colors">
                <Link to="/contactUs">
                  ContactUs
                </Link>

              </p>
            </div>
          </div>


          <div>
            <p className="font-bold text-2xl">Support</p>
            <div className="mt-7 space-y-2">
              <p className="text-slate-600 font-bold font-poppins  hover:text-orange-500 transition-colors flex justify-center w-36  ">
                <img src="https://cdn-icons-png.flaticon.com/128/10542/10542947.png" alt="" className="w-5 h-5 mr-2 " />+123-456-7890

              </p>
              <p className="text-slate-600 font-bold font-poppins  hover:text-orange-500 transition-colors flex justify-center w-36  ">
                <img src="https://cdn-icons-png.flaticon.com/128/1944/1944502.png" alt="" className="w-5 h-5 mr-2 " />+123-456-7890

              </p>
              <p className="text-slate-600 font-bold font-poppins  hover:text-orange-500 transition-colors flex justify-center w-36  ">
                <img src="https://cdn-icons-png.flaticon.com/128/546/546394.png" alt="" className="w-5 h-5 mr-1 " /> xyz@gmail.com

              </p>
            </div>
          </div>


          <div className="text-center md:text-left">
            <div className="flex justify-center md:justify-start space-x-5 ml-4">
              <a href="https://www.facebook.com/groups/travelingtheworlds/"
                target="_blank"
                rel="noopener noreferrer"
              >


                <img
                  className="hover:translate-y-[-5px] transition-transform duration-300 rounded-full cursor-pointer h-9 w-10"
                  src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png"
                  alt="Social Icon 1"
                />
              </a>
              <a
                href="https://www.instagram.com/bestintravel/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="hover:translate-y-[-5px] transition-transform duration-300 rounded-full cursor-pointer h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/128/15713/15713420.png"
                  alt="Instagram"
                />
              </a>

              <a
                href="https://x.com/traweltheworld"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  className="hover:translate-y-[-5px] transition-transform duration-300 rounded-full cursor-pointer h-10 w-10"
                  src="https://cdn-icons-png.flaticon.com/128/3670/3670127.png"
                  alt="Social Icon 3"
                />
              </a>
            </div>
            <p className="mt-4 text-slate-600 font-bold font-poppins text-center mr-4">Discover our app</p>
            <div className="flex justify-center md:justify-start items-center gap-2 mt-4">
              <img src="/Image/Google Play.png" alt="Google Play" />
              <img src="/Image/Play Store.png" alt="Play Store" />
            </div>
          </div>
        </div>

        <div className="mt-16 flex justify-center border-t pt-6">
          <p className="text-slate-600 font-serif font-bold">
            All rights reserved @jadoo.com
          </p>
        </div>
      </div>

      <SplashCursor/>
     
    </>
  );
};

export default HotelList;
