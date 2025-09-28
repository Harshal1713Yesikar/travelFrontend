import React, { useState } from 'react';
import { X, Calendar, Users, MapPin, Star, CreditCard, User } from 'lucide-react';

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
cardNumber: '',
expiryDate: '',
cvv: '',
cardName: ''
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

const handleSubmit = (e) => {
e.preventDefault();
const bookingData = {
hotelId: hotel.id,
checkIn,
checkOut,
guests,
totalPrice: total,
guestInfo: {
firstName: formData.firstName,
lastName: formData.lastName,
email: formData.email,
phone: formData.phone,
specialRequests: formData.specialRequests
}
};
onConfirm(bookingData);
};

const handleInputChange = (field, value) => {
setFormData(prev => ({ ...prev, [field]: value }));
};

if (!isOpen) return null;

return ( <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"> <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Information
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cardholder Name *
              </label>
              <input
                type="text"
                required
                value={formData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Card Number *
              </label>
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                value={formData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiry Date *
                </label>
                <input
                  type="text"
                  required
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CVV *
                </label>
                <input
                  type="text"
                  required
                  placeholder="123"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
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
