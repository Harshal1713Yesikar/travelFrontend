import React, { useState } from 'react';
import {
  Plane, MapPin, Calendar, Users, ArrowLeftRight
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";
import * as Yup from "yup";
import axios from 'axios';

const flightSchema = Yup.object().shape({
  departureCity: Yup.string()
    .trim()
    .required("Departure city is required"),

  arrivalCity: Yup.string()
    .trim()
    .required("Arrival city is required"),

  departureDate: Yup.date()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Please select a departure date")
    .min(new Date(), "Please select a departure date"),


  passengers: Yup.number()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .required("Number of passengers is required")
    .min(1, "At least 1 passenger required")


});

const FlightSearch = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [tripType, setTripType] = useState("one-way");
  const [formData, setFormData] = useState({
    departureCity: "",
    arrivalCity: "",
    departureDate: "",
    passengers: "",
    tripType: "one-way",
    returnDate: "",
  });

  const handleInputChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    try {
      await flightSchema.validateAt(name, { ...formData, [name]: value });
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    } catch (err) {
      if (err.name === "ValidationError") {
        setErrors((prev) => ({
          ...prev,
          [name]: err.message,
        }));
      }
    }
  };

  const handleTripTypeChange = (type) => {
    setTripType(type);
    setFormData((prev) => ({
      ...prev,
      tripType: type,

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
    return tomorrow.toISOString().split("T")[0];
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await flightSchema.validate(formData, { abortEarly: false });

      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/flight`,
        {
          city: formData.departureCity,
          arrivalCity: formData.arrivalCity,
          date: formData.departureDate,
          number: formData.passengers.toString(),
          tripType: formData.tripType,
          returnDate: formData.returnDate,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Flight search completed successfully!", {
        position: "bottom-right",
      });

      setFormData({
        departureCity: "",
        arrivalCity: "",
        departureDate: "",
        passengers: 1,
        tripType: "one-way",
        returnDate: "",
      });
      setTripType("one-way");
    } catch (err) {
      if (err.name === "ValidationError") {
        const validationErrors = {};
        err.inner.forEach((e) => (validationErrors[e.path] = e.message));
        setErrors(validationErrors);
        toast.error("Please enter the input fields.", {
          position: "bottom-right",
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "bottom-right",
        });
        console.error("Error:", err);
      }
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
                src="https://plus.unsplash.com/premium_photo-1661962354730-cda54fa4f9f1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fHBsYW5lfGVufDB8fDB8fHww"
                alt="Travel the world"
                className="w-full max-w-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute -bottom-6 -right-6 bg-orange-400 text-white p-4 rounded-xl shadow-lg">
                <p className="font-bold text-lg">✈️ Ready to fly?</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 text-center lg:text-left">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 font-inika">
              Your Journey
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-500">
                {" "}Starts Here
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover amazing destinations, book flights at the best prices, and create unforgettable memories.
            </p>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 w-full max-w-4xl mx-auto">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <Plane className="w-8 h-8 text-orange-500 mr-3" />
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-inika">
                  Find Your Perfect Flight
                </h1>
              </div>
              <p className="text-gray-600">Search and compare flights from hundreds of airlines</p>
            </div>


            <div className="flex justify-center mb-6">
              <div className="bg-gray-100 rounded-lg p-1 inline-flex">
                {["one-way", "round-trip"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => handleTripTypeChange(type)}
                    className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${tripType === type
                      ? "bg-white text-orange-600 shadow-sm"
                      : "text-gray-600 hover:text-gray-800"
                      }`}
                  >
                    {type === "one-way" ? "One Way" : "Round Trip"}
                  </button>
                ))}
              </div>
            </div>


            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative">
                {["departureCity", "arrivalCity"].map((field, i) => (
                  <div key={field} className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {i === 0 ? "From" : "To"}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        name={field}
                        value={formData[field]}
                        onChange={handleInputChange}
                        placeholder={`Enter ${i === 0 ? "departure" : "destination"} city`}
                        className={`w-full px-4 py-3 pl-10 border rounded-lg focus:ring-2 focus:ring-[#fdbd33] outline-none focus:border-transparent ${errors[field] ? "border-red-500 ring-1 ring-red-500" : ""
                          }`}
                      />
                    </div>
                    {errors[field] && <p className="text-sm text-red-600">{errors[field]}</p>}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={swapCities}
                  className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white border-2 border-orange-200 rounded-full p-2 hover:border-orange-400 hover:bg-orange-50 transition-all duration-200 hidden md:block"
                >
                  <ArrowLeftRight className="w-4 h-4 text-orange-500" />
                </button>
              </div>


              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Departure Date</label>
                  <input
                    name="departureDate"
                    type="date"
                    value={formData.departureDate}
                    onChange={handleInputChange}
                    min={getTomorrowDate()}
                    className={`w-full px-4 py-3 pl-10 border  rounded-lg focus:ring-2 focus:ring-[#fdbd33] outline-none focus:border-transparent ${errors.departureDate ? "border-red-500 ring-1 ring-red-500" : ""
                      }`}
                  />
                  {errors.departureDate && <p className="text-sm text-red-600">{errors.departureDate}</p>}
                </div>

                {tripType === "round-trip" && (
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Return Date
                    </label>
                    <input
                      name="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      min={formData.departureDate || getTomorrowDate()}
                      className={`w-full px-4 py-3 pl-10 border  rounded-lg focus:ring-2 focus:ring-[#fdbd33] outline-none focus:border-transparent ${errors.departureDate ? "border-red-500 ring-1 ring-red-500" : ""
                        }`}
                    />

                  </div>
                )}

              </div>


              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  <Users className="inline w-4 h-4 mr-1" /> Passengers
                </label>
                <select
                  name="passengers"
                  value={formData.passengers || 0}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border rounded-lg  text-black focus:ring-2 focus:ring-[#fdbd33] outline-none"
                >
                  {[...Array(9)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 0} {i === 0 ? "Passenger" : "Passengers"}
                    </option>
                  ))}
                </select>
                {errors.passengers && <p className="text-sm text-red-600">{errors.passengers}</p>}
              </div>


              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-4 text-lg inline-flex items-center justify-center font-medium rounded-lg bg-gradient-to-r from-orange-400 to-yellow-400 text-white hover:from-orange-500 hover:to-yellow-500 transition-all"
              >
                {isLoading ? "Searching Flights..." : "Search Flights"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightSearch;
