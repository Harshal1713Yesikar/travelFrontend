import React from 'react';
import { Sliders, Star } from 'lucide-react';

const amenitiesList = [
'WiFi',
'Pool',
'Gym',
'Spa',
'Parking',
'Restaurant',
'Bar',
'Room Service',
'Pet Friendly',
'Business Center'
];

export function FilterSidebar({ filters, onFiltersChange }) {
const handlePriceChange = (value) => {
onFiltersChange({ ...filters, priceRange: value });
};

const handleRatingChange = (rating) => {
onFiltersChange({ ...filters, rating });
};

const handleAmenityToggle = (amenity) => {
const newAmenities = filters.amenities.includes(amenity)
? filters.amenities.filter(a => a !== amenity)
: [...filters.amenities, amenity];
onFiltersChange({ ...filters, amenities: newAmenities });
};

return ( <div className="bg-white rounded-xl p-6 shadow-lg sticky top-4"> <div className="flex items-center gap-2 mb-6"> <Sliders className="w-5 h-5 text-gray-600" /> <h3 className="text-lg font-semibold text-gray-800">Filters</h3> </div>

  <div className="mb-8">
    <h4 className="font-medium text-gray-700 mb-4">Price Range</h4>
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">₹0</span>
        <span className="text-sm text-gray-600">₹5000+</span>
      </div>
      <input
        type="range"
        min="500"
        max="5000"
        step="50"
        value={filters.priceRange[1]}
        onChange={(e) => handlePriceChange([0, parseInt(e.target.value)])}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
      />
      <div className="text-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
          Up to ₹{filters.priceRange[1]}
        </span>
      </div>
    </div>
  </div>

  <div className="mb-8">
    <h4 className="font-medium text-gray-700 mb-4">Minimum Rating</h4>
    <div className="space-y-2">
      {[5, 4, 3, 2, 1].map((rating) => (
        <button
          key={rating}
          onClick={() => handleRatingChange(rating)}
          className={`flex items-center gap-2 w-full p-2 rounded-lg transition-colors ₹{
            filters.rating === rating
              ? 'bg-blue-100 text-blue-800'
              : 'hover:bg-gray-100'
          }`}
        >
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
            {[...Array(5 - rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gray-300" />
            ))}
          </div>
          <span className="text-sm">& up</span>
        </button>
      ))}
    </div>
  </div>

  <div>
    <h4 className="font-medium text-gray-700 mb-4">Amenities</h4>
    <div className="space-y-2 max-h-48 overflow-y-auto">
      {amenitiesList.map((amenity) => (
        <label key={amenity} className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.amenities.includes(amenity)}
            onChange={() => handleAmenityToggle(amenity)}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">{amenity}</span>
        </label>
      ))}
    </div>
  </div>

  <button
    onClick={() => onFiltersChange({
      destination: '',
      checkIn: '',
      checkOut: '',
      guests: 2,
      priceRange: [0, 1000],
      rating: 0,
      amenities: []
    })}
    className="w-full mt-6 px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
  >
    Clear All Filters
  </button>
</div>


);
}
