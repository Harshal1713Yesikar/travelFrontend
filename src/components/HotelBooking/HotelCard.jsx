import React from 'react';
import { Star, MapPin, Wifi, Car, Dumbbell, Waves, Heart } from 'lucide-react';

const amenityIcons = {
  'WiFi': <Wifi className="w-4 h-4" />,
  'Parking': <Car className="w-4 h-4" />,
  'Gym': <Dumbbell className="w-4 h-4" />,
  'Pool': <Waves className="w-4 h-4" />,
};

export function HotelCard({ hotel, onBook, checkIn, checkOut, guests }) {
  const calculateNights = () => {
    if (!checkIn || !checkOut) return 1;
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return nights > 0 ? nights : 1;
  };

  const nights = calculateNights();
  const totalPrice = hotel.price * nights;

  return (<div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"> <div className="md:flex">
    <div className="md:w-1/3 relative"> <img
      src={hotel.image}
      alt={hotel.name}
      className="w-full h-64 md:h-full object-cover"
    /> 
      {hotel.featured && (<div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
        Featured </div>
      )} </div>


    <div className="md:w-2/3 p-6">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-1">{hotel.name}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{hotel.location}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1 mb-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{hotel.rating}</span>
            <span className="text-sm text-gray-500">({hotel.reviews} reviews)</span>
          </div>
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{hotel.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {hotel.amenities.slice(0, 6).map((amenity) => (
          <div
            key={amenity}
            className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-xs"
          >
            {amenityIcons[amenity] || <span className="w-4 h-4" />}
            <span>{amenity}</span>
          </div>
        ))}
        {hotel.amenities.length > 6 && (
          <span className="text-xs text-gray-500 px-3 py-1">
            +{hotel.amenities.length - 6} more
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-4 border-t">
        <div className="text-left">
          <div className="text-sm text-gray-600">
            {nights} {nights === 1 ? 'night' : 'nights'}, {guests} {guests === 1 ? 'guest' : 'guests'}
          </div>
          <div className="text-2xl font-bold text-gray-800">
            ₹{totalPrice}
            <span className="text-sm font-normal text-gray-600 ml-1">total</span>
          </div>
          <div className="text-sm text-gray-500">
            ₹{hotel.price} per night
          </div>
        </div>

        <button
          onClick={onBook}
          className="bg-[#fdbd33] text-white rounded-lg hover:bg-[#fcb000] transition duration-300  px-6 py-3 font-semibold   shadow-md hover:shadow-lg transform hover:scale-105"
        >
          Book Now
        </button>
      </div>
    </div>
  </div>
  </div>


  );
}
