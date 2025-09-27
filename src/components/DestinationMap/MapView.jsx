import React, { useState } from 'react';
import { MapPin, Navigation, ZoomIn as Zoom } from 'lucide-react';

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const locations = [
    {
      id: '1',
      name: 'Taj Mahal Palace Hotel',
      type: 'hotel',
      coordinates: { lat: 27.1751, lng: 78.0421 },
      rating: 4.8,
      image: 'https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg'
    },
    {
      id: '2',
      name: 'India Gate',
      type: 'attraction',
      coordinates: { lat: 28.6129, lng: 77.2295 },
      rating: 4.5,
      image: 'https://images.pexels.com/photos/789750/pexels-photo-789750.jpeg'
    },
    {
      id: '3',
      name: 'Goa Beach Resort',
      type: 'hotel',
      coordinates: { lat: 15.2993, lng: 74.1240 },
      rating: 4.6,
      image: 'https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg'
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden h-[32rem] flex flex-col md:flex-row">
      <div className="relative flex-1 bg-gradient-to-br from-blue-100 to-green-100">
        <div className="absolute inset-0 flex items-center justify-center p-4 text-center text-gray-600">
          <div>
            <Navigation className="h-12 w-12 mx-auto mb-2 opacity-50 md:h-16 md:w-16" />
            <p className="text-base font-medium md:text-lg">Interactive Map View</p>
            <p className="text-sm">Map integration would be implemented here</p>
          </div>
        </div>

        {locations.map((location, index) => (
          <button
            key={location.id}
            onClick={() => setSelectedLocation(location)}
            className={`absolute transform -translate-x-1/2 -translate-y-full transition-all duration-200 ${
              selectedLocation?.id === location.id ? 'scale-125' : 'hover:scale-110'
            }`}
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 20}%`
            }}
          >
            <div className="bg-red-500 text-white p-1.5 md:p-2 rounded-full shadow-lg">
              <MapPin className="h-4 w-4 md:h-5 md:w-5" />
            </div>
          </button>
        ))}

        
        <div className="absolute top-2 right-2 md:top-4 md:right-4 flex flex-col space-y-2">
          <button className="bg-white p-1.5 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <Zoom className="h-4 w-4 text-gray-600" />
          </button>
          <button className="bg-white p-1.5 md:p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
            <Navigation className="h-4 w-4 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="w-full md:w-80 p-4 md:p-6 border-t md:border-t-0 md:border-l border-gray-200 bg-gray-50 ">
        {selectedLocation ? (
          <div>
            <img
              src={selectedLocation.image}
              alt={selectedLocation.name}
              className="w-full h-40 md:h-44 object-cover rounded-lg mb-4 mt-14"
            />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{selectedLocation.name}</h3>
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 text-sm">
                {'★'.repeat(Math.floor(selectedLocation.rating))}
              </span>
              <span className="text-gray-600 ml-2 text-sm">{selectedLocation.rating}</span>
            </div>
            <span
              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                selectedLocation.type === 'hotel'
                  ? 'bg-blue-100 text-blue-800'
                  : selectedLocation.type === 'attraction'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-purple-100 text-purple-800'
              }`}
            >
              {selectedLocation.type}
            </span>
            <button className="w-full mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
              View Details
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-8 md:mt-40">
            <MapPin className="h-10 w-10 mx-auto mb-4 opacity-50 md:h-12 md:w-12" />
            <p>Select a location on the map to view details</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
