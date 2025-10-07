import React, { useState } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';

const indianCities = [
  "Indore, Madhya Pradesh",
  "Pune, Maharastra",
  'Chennai, Tamil Nadu',
  'Bangalore, Karnataka',
  'Kolkata, West Bengal',
  'Jaipur, Rajasthan',
  'Hyderabad, Telangana',
  'Mumbai, Maharashtra',
  'Kerala, India',
  'New Delhi, India',
  'Hyderabad, India',
  'Chennai, India',
  'Agra, India',
  'Jodhpur, India',
  'Kolkata, India',
  'Connaught Place, New Delhi, India',
  'Goa, India',

];

export function SearchBar({ filters, onFiltersChange }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredCities, setFilteredCities] = useState([]);

  const handleInputChange = (field, value) => {
    if (field === 'destination') {
      const filtered = indianCities
        .filter(city => city.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8);
      setFilteredCities(filtered);
      setShowSuggestions(value.length > 0 && filtered.length > 0);
    }
    onFiltersChange({ ...filters, [field]: value });
  };

  const handleCitySelect = (city) => {
    onFiltersChange({ ...filters, destination: city });
    setShowSuggestions(false);
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-2xl max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPin className="inline w-4 h-4 mr-1" />
            Destination
          </label>
          <input
            type="text"
            placeholder="Where are you going?"
            value={filters.destination}
            onChange={(e) => handleInputChange('destination', e.target.value)}
            onFocus={() => {
              if (filters.destination) {
                const filtered = indianCities
                  .filter(city =>
                    city.toLowerCase().includes(filters.destination.toLowerCase())
                  )
                  .slice(0, 8);
                setFilteredCities(filtered);
                setShowSuggestions(filtered.length > 0);
              }
            }}
            className="w-full px-4 py-3 border rounded-lg focus:ring-2 text-black  focus:ring-[#fdbd33] outline-none focus:border-transparent transition-all"
          />

          {showSuggestions && (
            <div
              className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-lg z-50 mt-1 max-h-64 overflow-y-auto"
              onMouseDown={(e) => e.preventDefault()}
            >
              {filteredCities.map((city, index) => (
                <button
                  key={index}
                  onMouseDown={() => handleCitySelect(city)}
                  className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-800">{city}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Check-in
          </label>
          <input
            type="date"
            value={filters.checkIn}
            min={getTomorrowDate()}
            onChange={(e) => handleInputChange('checkIn', e.target.value)}
            className="w-full px-4 py-3 border  rounded-lg  text-black focus:ring-2 focus:ring-[#fdbd33] outline-none focus:border-transparent transition-all"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Calendar className="inline w-4 h-4 mr-1" />
            Check-out
          </label>
          <input
            type="date"
            min={getTomorrowDate()}
            value={filters.checkOut}
            onChange={(e) => handleInputChange('checkOut', e.target.value)}
            className="w-full px-4 py-3 border  rounded-lg  text-black focus:ring-2 focus:ring-[#fdbd33] outline-none focus:border-transparent transition-all"
          />
        </div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Users className="inline w-4 h-4 mr-1" />
            Guests
          </label>
          <select
            value={filters.guests}
            onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
            className="w-full px-4 py-3 border  rounded-lg  text-black focus:ring-2 focus:ring-[#fdbd33] outline-none focus:border-transparent transition-all"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num} {num === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-6 flex justify-center">

      </div>


    </div>
  );
}
