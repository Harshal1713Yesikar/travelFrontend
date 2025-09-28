import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, Star, CreditCard, User } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

export function BookingModal({
  hotel,
  isOpen,
  onClose,
  onConfirm,
  checkIn,
  checkOut,
  guests
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    specialRequests: '',
    checkIn,
    checkOut,
    guests
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

    const bookingData = {
      firstname: formData.firstName,
      lastname: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      msg: formData.specialRequests,
      totalPrice: total,
      hotelName: hotel.name,
      hotelLocation: hotel.location,
      hotelImage: hotel.image,
      guests: guests,
      checkIn: checkIn,
      checkOut: checkOut
    };

    try {
      // const res = await axios.post("http://localhost:3001/hotelbooking", bookingData);

      const res = await axios.post(
        `${process.env.REACT_APP_Backend_URL}/hotelbooking`,
        bookingData,
        { headers: { "Content-Type": "application/json" } }
      );


      if (res.status === 201 || res.status === 200) {
        console.log("API Response:", res.data.booking);
        toast.success("🎉 Hotel Booked successfully!", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Booking failed:", error.response?.data || error.message);
      toast.success("Booking failed. Please try again.", { position: "bottom-right" });
    }
  };



  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (!isOpen) return null;

  return (<div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"> <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
    <div className="flex items-center justify-between p-6 border-b"> <h2 className="text-2xl font-bold text-gray-800">Complete Your Booking</h2> <button
      onClick={onClose}
      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
    > <X className="w-6 h-6" /> </button> </div>

    <div className="grid md:grid-cols-2 gap-6 p-6">
      <div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <User className="w-5 h-5" />
              Guest Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 mt-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 mt-3">
                Special Requests
              </label>
              <textarea
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Any special requirements or requests..."
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-[#fdbd33] text-white  hover:bg-[#fcb000] transition duration-300 py-4 rounded-lg font-semibold text-lg  shadow-lg hover:shadow-xl"
          >
            Confirm Booking - ₹ {total.toFixed(2)}
          </button>
        </form>
      </div>

      <div>
        <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>

          <div className="mb-6">
            <img
              src={hotel.image}
              alt={hotel.name}
              className="w-full h-32 object-cover rounded-lg mb-3"
            />
            <h4 className="font-semibold text-gray-800">{hotel.name}</h4>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {hotel.location}
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
              {hotel.rating} ({hotel.reviews} reviews)
            </div>
          </div>

          <div className="space-y-3 mb-6">
            <div className="flex items-center text-sm">
              <Calendar className="w-4 h-4 mr-2 text-gray-500" />
              <span>{checkIn ? new Date(checkIn).toLocaleDateString() : 'Select date'} - {checkOut ? new Date(checkOut).toLocaleDateString() : 'Select date'}</span>
            </div>
            <div className="flex items-center text-sm">
              <Users className="w-4 h-4 mr-2 text-gray-500" />
              <span>{guests} {guests === 1 ? 'Guest' : 'Guests'}, {nights} {nights === 1 ? 'Night' : 'Nights'}</span>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span>₹ {hotel.price} × {nights} nights</span>
              <span>₹ {subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Taxes & fees</span>
              <span>₹ {taxes.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Total</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>


  );
}
