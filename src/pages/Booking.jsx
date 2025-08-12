import React, { useState } from "react";
import { Link } from "react-router-dom";
import useScrollAnimation from "../useScrollAnimation";
import toast from "react-hot-toast";
import SplashCursor from "../components/nurui/splash-cursor";
import axios from "axios";

const Booking = () => {
  useScrollAnimation()

  const [data, setData] = useState({
    name: "",
    date: "",
    number: ""
  })

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleBooking = async (e) => {
    e.preventDefault();
try {
  const res = await axios.post(
    `${process.env.REACT_APP_Backend_URL}/book`,
    data, 
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  console.log(res.data, "API Response");

  setData({ name: "", date: "", number: "" });

  toast.success("Message Sent Successfully", {
    position: "bottom-right",
  });
} catch (error) {
  console.error("API Call Failed:", error);
  toast.error(
    error.response?.data?.message || "Something went wrong!",
    { position: "bottom-right" }
  );
}}

  return (
    <>
    <div className="container mx-auto px-4 mt-16 max-w-7xl animate-on-scroll">
  <div className="flex flex-col md:flex-row items-center gap-10">
    <div className="w-full md:w-1/2 flex justify-center">
      <img
        src="https://images.pexels.com/photos/912050/pexels-photo-912050.jpeg?auto=compress&cs=tinysrgb&w=600"
        alt="Airplane"
        className="w-full max-w-md rounded-lg shadow-lg"
      />
    </div>

    <form
      onSubmit={handleBooking}
      className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6"
    >
      <h2 className="text-[#14183E] text-3xl md:text-4xl font-bold text-center font-inika">
        Book Your Trip
      </h2>

      <div className="mt-6 space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Enter Destination"
          value={data.name}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none"
          required
        />
        <input
          type="date"
          name="date"
          value={data.date}
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none"
          required
        />
        <input
          type="number"
          min="1"
          name="number"
          value={data.number}
          placeholder="Enter the Number"
          onChange={handleChange}
          className="w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-4 px-6 py-3 bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300 w-full"
      >
        Book Now
      </button>
    </form>
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
 {/* <SplashCursor /> */}
    </>
  );
};

export default Booking;
