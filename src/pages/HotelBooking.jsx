import React, { useState, useEffect } from 'react';
import { hotels } from '../data/hotelsData';
import { HotelCard } from '../components/HotelBooking/HotelCard';
import { SearchBar } from '../components/HotelBooking/Search';
import { FilterSidebar } from '../components/HotelBooking/FilterSideBar';
import { BookingModal } from '../components/HotelBooking/BookingModal';
import { Hotel, SearchFilters, BookingData } from '../types/hotel';
import { Link } from 'react-router-dom';

export function HotelBooking() {

  const [filteredHotels, setFilteredHotels] = useState(hotels);
  const [filters, setFilters] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 2,
    priceRange: [0, 1000],
    rating: 0,
    amenities: []
  });
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    let filtered = hotels.filter(hotel => {
      const matchesDestination = !filters.destination ||
        hotel.location.toLowerCase().includes(filters.destination.toLowerCase());
      const matchesPrice = hotel.price >= filters.priceRange[0] && hotel.price <= filters.priceRange[1];
      const matchesRating = hotel.rating >= filters.rating;
      const matchesAmenities = filters.amenities.length === 0 ||
        filters.amenities.every(amenity => hotel.amenities.includes(amenity));

      return matchesDestination && matchesPrice && matchesRating && matchesAmenities;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredHotels(filtered);

  }, [filters, sortBy]);

  const handleBooking = (hotel) => {
    setSelectedHotel(hotel);
    setIsBookingModalOpen(true);
  };

  const handleBookingConfirm = (bookingData) => {
    console.log('Booking confirmed:', bookingData);
    setIsBookingModalOpen(false);
    setSelectedHotel(null);
  };

  return (
  <>
    <div className="min-h-screen bg-gray-50">
      <div

       className="bg-gradient-to-r from-blue-600 to-purple-700 text-white">

        <div className="container mx-auto px-4 py-16"> <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-xl text-blue-100">Discover amazing hotels in India with the best prices</p>
        </div> <SearchBar filters={filters} onFiltersChange={setFilters} />
        </div>
      </div>


      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {filteredHotels.length} Hotels Found
                </h2>
                {filters.destination && (
                  <p className="text-gray-600">in {filters.destination}</p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Sort by:</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="rating">Rating</option>
                  <option value="price">Price</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            <div className="grid gap-6">
              {filteredHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onBook={() => handleBooking(hotel)}
                  checkIn={filters.checkIn}
                  checkOut={filters.checkOut}
                  guests={filters.guests}
                />
              ))}
            </div>

            {filteredHotels.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No hotels found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {isBookingModalOpen && selectedHotel && (
        <BookingModal
          hotel={selectedHotel}
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onConfirm={handleBookingConfirm}
          checkIn={filters.checkIn}
          checkOut={filters.checkOut}
          guests={filters.guests}
        />
      )}
    </div>

     <div className="bg-gray-100 py-16 px-6 mt-16 sm:px-12 lg:px-20">
            <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-16 mt-12 animate-on-scroll">
              <div className="text-center md:text-left">
                <p className="font-poppins font-semibold text-4xl">Jaddoo.</p>
               <p className="w-80 md:w-68 text-[#5E6282] mt-7 font-semibold">
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
}
