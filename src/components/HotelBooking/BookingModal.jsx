import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, Star, CreditCard, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import * as Yup from "yup";

export function BookingModal({
  hotel,
  isOpen,
  onClose,
  onConfirm,
  checkIn,
  checkOut,
  guests
}) {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: "",
    specialRequests: '',
    checkIn,
    checkOut,
    guests
  });

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const schema = Yup.object().shape({
    firstName: Yup.string().required("Please enter your first name"),
    lastName: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
  });

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = calculateNights();
  const subtotal = hotel.price * nights;
  const taxes = subtotal * 0.12;
  const total = subtotal + taxes;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await schema.validate(data, { abortEarly: false });
      setErrors({});
      const bookingData = {
        firstname: data.firstName,
        lastname: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        checkIn,
        checkOut,
        guests,
        totalPrice: total,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        hotelImage: hotel.image,
      };

      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/hotelbooking`,
        bookingData,
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success("Booking Successful 🎉", { position: "bottom-right" });
      setData({ firstName: "", lastName: "", email: "", phone: "", message: "" });
    } catch (err) {
      if (err.inner) {
        const formErrors = {};
        err.inner.forEach((e) => {
          formErrors[e.path] = e.message;
        });
        setErrors(formErrors);
      } else {
        toast.error("Something went wrong!", { position: "bottom-right" });
      }
    }
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 overflow-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full 
                    mt-4 mb-4 md:mt-0 md:mb-0">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-2xl font-bold">Complete Your Booking</h2>
            <button onClick={onClose} className="hover:bg-gray-100 p-2 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      value={data.firstName}
                      onChange={handleChange}
                      className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.firstName ? "border-red-500" : ""
                        }`}
                      placeholder="Enter first name"
                    />
                    {errors.firstName && (
                      <p className="text-red-600 text-sm">{errors.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      value={data.lastName}
                      onChange={handleChange}
                      className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.lastName ? "border-red-500" : ""
                        }`}
                      placeholder="Enter last name"
                    />
                    {errors.lastName && (
                      <p className="text-red-600 text-sm">{errors.lastName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.email ? "border-red-500" : ""
                      }`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    className={`w-full border rounded-md p-2 focus:ring-2 focus:ring-[#fdbd33] outline-none ${errors.phone ? "border-red-500" : ""
                      }`}
                    placeholder="Enter 10-digit number"
                  />
                  {errors.phone && (
                    <p className="text-red-600 text-sm">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium">Message</label>
                  <textarea
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    className="w-full border rounded-md p-2 h-24 resize-none focus:ring-2 focus:ring-[#fdbd33] outline-none"
                    placeholder="Any special request?"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#fdbd33] text-white font-semibold py-3 rounded-md hover:bg-[#fcb000] transition"
                >
                  Confirm Booking - ₹{total.toFixed(2)}
                </button>
              </form>
            </div>


            <div className="bg-gray-50 rounded-lg p-4">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">{hotel.name}</h3>
              <p className="text-gray-600 flex items-center text-sm mt-1">
                <MapPin className="w-4 h-4 mr-1" /> {hotel.location}
              </p>
              <p className="text-gray-600 flex items-center text-sm mt-1">
                <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />{" "}
                {hotel.rating} ({hotel.reviews} reviews)
              </p>

              <hr className="my-3" />

              <p className="flex items-center text-sm text-gray-700">
                <Calendar className="w-4 h-4 mr-1 text-gray-500" />{" "}
                {new Date(checkIn).toLocaleDateString()} →{" "}
                {new Date(checkOut).toLocaleDateString()}
              </p>
              <p className="flex items-center text-sm text-gray-700 mt-1">
                <Users className="w-4 h-4 mr-1 text-gray-500" /> {guests} Guests
              </p>

              <div className="mt-4 text-sm text-gray-800 space-y-1">
                <div className="flex justify-between">
                  <span>₹{hotel.price} × {nights} nights</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes (12%)</span>
                  <span>₹{taxes.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t pt-2">
                  <span>Total</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>



  );
}
