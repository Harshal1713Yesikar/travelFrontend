import React, { useState, useCallback } from 'react';
import { Plane, MapPin, Calendar, Users, ArrowLeftRight, Phone, MessageCircle, Mail } from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";

const FlightSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [tripType, setTripType] = useState('one-way');
  const [formData, setFormData] = useState({
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    passengers: 1,
    tripType: 'one-way',
    returnDate: '',
  });

  const validateForm = useCallback((data) => {
    const errors = {};

    if (!data.departureCity.trim()) {
      errors.departureCity = 'Departure city is required';
    }
    if (!data.arrivalCity.trim()) {
      errors.arrivalCity = 'Arrival city is required';
    }
    if (!data.departureDate) {
      errors.departureDate = 'Departure date is required';
    } else {
      const selectedDate = new Date(data.departureDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        errors.departureDate = 'Departure date cannot be in the past';
      }
    }
    if (!data.passengers || data.passengers < 1) {
      errors.passengers = 'At least 1 passenger is required';
    }
    if (data.passengers > 9) {
      errors.passengers = 'Maximum 9 passengers allowed';
    }

    if (data.tripType === 'round-trip' && !data.returnDate) {
      errors.returnDate = 'Return date is required for round-trip';
    }

    if (
      data.tripType === 'round-trip' &&
      data.returnDate &&
      data.departureDate
    ) {
      const departureDate = new Date(data.departureDate);
      const returnDate = new Date(data.returnDate);
      if (returnDate <= departureDate) {
        errors.returnDate = 'Return date must be after departure date';
      }
    }

    return errors;
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'passengers' ? parseInt(value) || 1: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    setFormData((prev) => ({
      ...prev,
      tripType: type,
      returnDate: type === 'one-way' ? '' : prev.returnDate,
    }));
  };

  const swapCities = () => {
    setFormData((prev) => ({
      ...prev,
      departureCity: prev.arrivalCity,
      arrivalCity: prev.departureCity,
    }));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const validationErrors = validateForm({ ...formData, tripType });
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_Backend_URL}/flight`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          city: formData.departureCity,
          arrivalCity: formData.arrivalCity,
          date: formData.departureDate,
          number: formData.passengers.toString(),
          tripType: tripType,
          returnDate: formData.returnDate,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Flight search completed successfully!', {
          position: 'top-right',
          duration: 4000,
        });

        setFormData({
          departureCity: '',
          arrivalCity: '',
          departureDate: '',
          passengers: 1,
          tripType: 'one-way',
          returnDate: '',
        });
        setTripType('one-way');
      } else {
        throw new Error(result.message || 'Flight search failed');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Something went wrong!';
      toast.error(errorMessage, {
        position: 'top-right',
        duration: 4000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="order-2 lg:order-1 flex justify-center">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/2244746/pexels-photo-2244746.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Travel the world"
                className="w-full max-w-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-400 text-white p-4 rounded-xl shadow-lg">
                <p className="font-bold text-lg">✈️ Ready to fly?</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Your Journey
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                {' '}Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing destinations, book flights at the best prices, and create unforgettable memories. 
              Your perfect trip is just a search away.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <div className="bg-white px-4 py-2 rounded-full shadow-md">
                <span className="text-sm text-gray-600">🌍 200+ Destinations</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-md">
                <span className="text-sm text-gray-600">✈️ 500+ Airlines</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-full shadow-md">
                <span className="text-sm text-gray-600">💰 Best Prices</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-4xl mx-auto">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Plane className="w-8 h-8 text-orange-500 mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                  Find Your Perfect Flight
                </h1>
              </div>
              <p className="text-gray-600">Search and compare flights from hundreds of airlines</p>
            </div>

            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                <button
                  type="button"
                  onClick={() => handleTripTypeChange('one-way')}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    tripType === 'one-way'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  One Way
                </button>
                <button
                  type="button"
                  onClick={() => handleTripTypeChange('round-trip')}
                  className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
                    tripType === 'round-trip'
                      ? 'bg-white text-orange-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  Round Trip
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">From</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="departureCity"
                      value={formData.departureCity}
                      onChange={handleInputChange}
                      placeholder="Enter departure city"
                      className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.departureCity ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.departureCity && (
                    <p className="text-sm text-red-600 mt-1">{errors.departureCity}</p>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={swapCities}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 
                             bg-white border-2 border-orange-200 rounded-full p-2 
                             hover:border-orange-400 hover:bg-orange-50 transition-all duration-200
                             hidden md:block"
                  title="Swap cities"
                >
                  <ArrowLeftRight className="w-4 h-4 text-orange-500" />
                </button>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">To</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <MapPin className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="arrivalCity"
                      value={formData.arrivalCity}
                      onChange={handleInputChange}
                      placeholder="Enter destination city"
                      className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.arrivalCity ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.arrivalCity && (
                    <p className="text-sm text-red-600 mt-1">{errors.arrivalCity}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Departure Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Calendar className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      min={getTomorrowDate()}
                      className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.departureDate ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.departureDate && (
                    <p className="text-sm text-red-600 mt-1">{errors.departureDate}</p>
                  )}
                </div>
                
                {tripType === 'round-trip' && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Return Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        name="returnDate"
                        type="date"
                        value={formData.returnDate}
                        onChange={handleInputChange}
                        min={formData.departureDate || getTomorrowDate()}
                        className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                          errors.returnDate ? 'border-red-500 ring-1 ring-red-500' : ''
                        }`}
                        required
                      />
                    </div>
                    {errors.returnDate && (
                      <p className="text-sm text-red-600 mt-1">{errors.returnDate}</p>
                    )}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Passengers</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Users className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      name="passengers"
                      type="number"
                      min="1"
                      max="9"
                      value={formData.passengers.toString()}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 ${
                        errors.passengers ? 'border-red-500 ring-1 ring-red-500' : ''
                      }`}
                      required
                    />
                  </div>
                  {errors.passengers && (
                    <p className="text-sm text-red-600 mt-1">{errors.passengers}</p>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 text-lg inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-orange-400 to-yellow-400 text-white hover:from-orange-500 hover:to-yellow-500 focus:ring-orange-500 shadow-lg hover:shadow-xl"
              >
                {isLoading && (
                  <svg className="w-4 h-4 mr-2 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {isLoading ? 'Searching Flights...' : 'Search Flights'}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Jaddoo?</h2>
            <p className="text-gray-600 text-lg">Everything you need for the perfect trip</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Easy Search</h3>
              <p className="text-gray-600">Compare flights from hundreds of airlines in seconds</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Best Prices</h3>
              <p className="text-gray-600">Get the lowest fares with our price guarantee</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Secure Booking</h3>
              <p className="text-gray-600">Your data is protected with enterprise-grade security</p>
            </div>
          </div>
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
    </div>
  );
};

export default FlightSearch;
