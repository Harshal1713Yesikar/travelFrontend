import React from "react";
import { Link } from "react-router-dom";
import useScrollAnimation from "../useScrollAnimation";
import SplashCursor from "../components/nurui/splash-cursor";
import DestinationCard from "./DestinationCard";
import MapView from "../components/DestinationMap/MapView"; 


const HotelList = () => {
  const destinations = [
    {
      id: '1',
      name: 'Taj Mahal Palace',
      location: 'Agra, India',
      image: 'https://media.istockphoto.com/id/519330110/photo/taj-mahal-agra-india-monument-of-love-in-blue-sky.jpg?s=612x612&w=0&k=20&c=Uma6Q7KduznA6jUKcSquFP1iHHiw8UXcZEYVLONrmaQ=',
      price: 8500,
      rating: 4.8,
      description: 'Experience luxury and heritage at this iconic palace hotel with stunning views of the Taj Mahal.',
      type: 'hotel'
    },
    {
      id: '2',
      name: 'Kerala Backwaters',
      location: 'Kerala, India',
      image: 'https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg',
      price: 12000,
      rating: 4.7,
      description: 'Explore the serene backwaters of Kerala with traditional houseboat accommodations.',
      type: 'package'
    },
    {
      id: '3',
      name: 'Goa Beach Resort',
      location: 'Goa, India',
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg',
      price: 6500,
      rating: 4.5,
      description: 'Relax at this beautiful beachfront resort with stunning ocean views and modern amenities.',
      type: 'hotel'
    },
    {
      id: '4',
      name: 'Rajasthan Royal Tour',
      location: 'Rajasthan, India',
      image: 'https://images.pexels.com/photos/3243090/pexels-photo-3243090.jpeg',
      price: 15000,
      rating: 4.9,
      description: 'Discover the royal heritage of Rajasthan with guided tours of magnificent palaces and forts.',
      type: 'package'
    },
    {
      id: '5',
      name: 'Himalayan Retreat',
      location: 'Himachal Pradesh, India',
      image: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg',
      price: 4500,
      rating: 4.6,
      description: 'Escape to the mountains with this peaceful retreat offering panoramic Himalayan views.',
      type: 'hotel'
    },
    {
      id: '6',
      name: 'Mumbai City Experience',
      location: 'Mumbai, India',
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg',
      price: 8300,
      rating: 6.8,
      description: 'Experience the vibrant culture and bustling energy of Mumbai, the city of dreams.',
      type: 'destination'
    },
       {
      id: '7',
      name: 'Manali Tourism',
      location: 'Himachal, India',
      image: 'https://www.holidify.com/images/bgImages/MANALI.jpg',
      price: 8500,
      rating: 4.8,
      description: ' Manali is a magical hill station at the northern end of Kullu valley in Himachal Pradesh.',
      type: 'hotel'
    },

         {
      id: '7',
      name: 'Darjeeling',
      location: 'West Bengal , India',
      image: 'https://www.holidify.com/images/bgImages/DARJEELING.jpg',
      price: 10000,
      rating: 6.8,
      description: '  the former summer capital of India under the British Raj, has evolved into one of Indias most sought-after hill stations.',
      type: 'package'
    },
         {
      id: '8',
      name: 'Kashmir',
      location: ' Jammu and Kashmir, India',
      image: 'https://www.holidify.com/images/bgImages/KASHMIR.jpg',
      price: 12000,
      rating: 8.8,
      description: 'Popularly referred to as the "Paradise on Earth," Kashmir is a breathtaking valley in Jammu & Kashmir union territory in 2019.',
      type: 'package'
    },
  ];

  return (
    <>
      <section className="py-16 px-4 sm:px-6 lg:px-8  ">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold dark:text-black mb-4">
              Featured Destinations
            </h2>
            <p className="text-xl text-gray-600  max-w-3xl mx-auto">
              Discover the most popular destinations and experiences handpicked by our travel experts
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-medium">
              View All Destinations
            </button>
          </div>

        </div>

        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white ">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 ">
                Explore Destinations
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mt-3 mx-auto">
                Discover hotels, attractions, and restaurants on our interactive map
              </p>
            </div>
            <MapView />
          </div>
        </section>
      </section>

      <div className="bg-gray-100 py-16 px-6 mt-16 sm:px-12 lg:px-20">
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-16 mt-12 animate-on-scroll">
          <div className="text-center md:text-left">
            <p className="font-poppins font-semibold text-4xl">Jaddoo.</p>
            <p className="w-96 md:w-68 text-[#5E6282] mt-7 font-semibold">
              Your trusted travel companion for discovering amazing destinations,
              booking hotels, and creating unforgettable memories around the world.
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
            © 2025 @jadoo.com All rights reserved.
          </p>
        </div>
      </div>
    </>





  );
};

export default HotelList;
