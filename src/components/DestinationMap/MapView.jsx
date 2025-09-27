import React, { useState, useEffect, useRef } from "react";
import { X, Navigation, ZoomIn, Star, Info, CircleX } from "lucide-react";
import loader from "./Loader";

const MapView = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);
  const markersRef = useRef([]);

  const locations = [
    {
      id: "1",
      name: "Nainital, Uttarakhand",
      type: "Hill Station",
      coordinates: { lat: 29.3919, lng: 79.4542 },
      rating: 4.5,
      image:
        "https://images.pexels.com/photos/3593865/pexels-photo-3593865.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "A beautiful hill station known for its pristine lakes and scenic beauty. Perfect for a peaceful retreat in the mountains.",
      highlights: ["Naini Lake", "Snow View Point", "Tiffin Top", "Mall Road"],
      bestTime: "March to June, September to November",
    },
    {
      id: "2",
      name: "Alleppey, Kerala",
      type: "Backwaters",
      coordinates: { lat: 9.4981, lng: 76.3388 },
      rating: 4.8,
      image:
        "https://images.pexels.com/photos/962464/pexels-photo-962464.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Famous for its backwaters, houseboats, and serene waterways. Experience the tranquil beauty of Kerala.",
      highlights: [
        "Houseboat Cruises",
        "Backwater Tours",
        "Kumarakom Bird Sanctuary",
        "Krishnapuram Palace",
      ],
      bestTime: "November to February",
    },
    {
      id: "3",
      name: "Jaipur, Rajasthan",
      type: "Heritage City",
      coordinates: { lat: 26.9124, lng: 75.7873 },
      rating: 4.6,
      image:
        "https://images.pexels.com/photos/3581368/pexels-photo-3581368.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "The Pink City known for its magnificent palaces and rich cultural heritage. A perfect blend of history and modernity.",
      highlights: ["Hawa Mahal", "City Palace", "Amber Fort", "Jantar Mantar"],
      bestTime: "October to March",
    },
    {
      id: "4",
      name: "Goa Beaches",
      type: "Beach Destination",
      coordinates: { lat: 15.2993, lng: 74.124 },
      rating: 4.4,
      image:
        "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "Sun, sand, and sea - Goa offers beautiful beaches, vibrant nightlife, and Portuguese colonial charm.",
      highlights: [
        "Baga Beach",
        "Calangute Beach",
        "Old Goa Churches",
        "Dudhsagar Falls",
      ],
      bestTime: "November to March",
    },
    {
      id: "5",
      name: "Manali, Himachal Pradesh",
      type: "Mountain Resort",
      coordinates: { lat: 32.2432, lng: 77.1892 },
      rating: 4.7,
      image:
        "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=800",
      description:
        "A high-altitude Himalayan resort town known for its cool climate and snow-capped mountain views.",
      highlights: ["Rohtang Pass", "Solang Valley", "Hadimba Temple", "Old Manali"],
      bestTime: "April to June, September to November",
    },
    {
  id: "6",
  name: "Darjeeling, West Bengal",
  type: "Hill Station",
  coordinates: { lat: 27.041, lng: 88.2663 },
  rating: 4.6,
  image:
    "https://lh3.googleusercontent.com/gpms-cs-s/AB8u6HaUKKeNvO0DU-hYFbzJhXJnpJFTxLf9NZanA2KMq3DmpzFLpFMscKD76AgHSHDwrf9jUia2lHvmc9CBHRxdxAldZyg00dPlQfCfbDBkwKnT26yQ8NU9-P5Vk5Wd6aIjCSV6wX63=s294-w294-h220-n-k-no",
  description:
    "Known as the 'Queen of the Hills', Darjeeling is famous for its tea gardens, Himalayan views, and the UNESCO toy train.",
  highlights: ["Tiger Hill", "Darjeeling Himalayan Railway", "Tea Plantations", "Batasia Loop"],
  bestTime: "March to May, September to November",
},
{
  id: "7",
  name: "Rishikesh, Uttarakhand",
  type: "Adventure & Spiritual",
  coordinates: { lat: 30.0869, lng: 78.2676 },
  rating: 4.7,
  image:
    "https://images.pexels.com/photos/1660990/pexels-photo-1660990.jpeg?auto=compress&cs=tinysrgb&w=800",
  description:
    "Yoga capital of the world, Rishikesh offers a mix of spirituality, yoga, and adventure sports like white-water rafting.",
  highlights: ["Laxman Jhula", "Triveni Ghat", "River Rafting", "Beatles Ashram"],
  bestTime: "September to November, March to May",
},
{
  id: "11",
  name: "Indore, Madhya Pradesh",
  type: "Cultural City",
  coordinates: { lat: 22.7196, lng: 75.8577 },
  rating: 4.5,
  image:
    "https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/0a/0d/6b/5a.jpg",
  description:
    "The commercial capital of Madhya Pradesh, Indore is known for its rich history, food culture, and vibrant markets.",
  highlights: ["Rajwada Palace", "Lal Bagh Palace", "Sarafa Bazaar", "Khajrana Ganesh Temple"],
  bestTime: "October to March",
},

{
  id: "9",
  name: "Varanasi, Uttar Pradesh",
  type: "Spiritual City",
  coordinates: { lat: 25.3176, lng: 82.9739 },
  rating: 4.5,
  image:
    "https://lh3.googleusercontent.com/gpms-cs-s/AB8u6Ha1hDIAuYmymCg5q7CL1G4rJedZG0fL5Wjd5VVFbOvEgysdQrxGFuEq9Ub2D5N94w4RbWjztnAHDSId5vxiuLgYoccGyyz9yL-8CsorGAunlaccRbFe3S4zXQbluyLhlUxtCj4i=w442-h300-n-k-no",
  description:
    "One of the world's oldest living cities, Varanasi is the spiritual heart of India, known for its ghats and Ganga aarti.",
  highlights: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Ganga Aarti", "Sarnath"],
  bestTime: "October to March",
},
{
  id: "10",
  name: "Mysore, Karnataka",
  type: "Heritage City",
  coordinates: { lat: 12.2958, lng: 76.6394 },
  rating: 4.6,
  image:
    "https://images.pexels.com/photos/450441/pexels-photo-450441.jpeg?auto=compress&cs=tinysrgb&w=800",
  description:
    "Known as the City of Palaces, Mysore is famous for Mysore Palace, silk sarees, sandalwood, and the grand Dussehra festival.",
  highlights: ["Mysore Palace", "Chamundi Hill", "Brindavan Gardens", "St. Philomena’s Church"],
  bestTime: "October to March",
},
{
  id: "11",
  name: "Udaipur, Rajasthan",
  type: "Lake City",
  coordinates: { lat: 24.5854, lng: 73.7125 },
  rating: 4.7,
  image:
    "https://s7ap1.scene7.com/is/image/incredibleindia/lake-pichola-udaipur-rajasthan-2-attr-hero?qlt=82&ts=1742161994371",
  description:
    "Known as the 'City of Lakes', Udaipur is surrounded by the beautiful Aravalli Hills and famous for its palaces and lakes.",
  highlights: ["Lake Pichola", "City Palace", "Jag Mandir", "Saheliyon ki Bari"],
  bestTime: "September to March",
},
{
  id: "12",
  name: "Shimla, Himachal Pradesh",
  type: "Hill Station",
  coordinates: { lat: 31.1048, lng: 77.1734 },
  rating: 4.5,
  image:
    "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=800",
  description:
    "The capital of Himachal Pradesh, Shimla is known for its colonial architecture, pleasant climate, and scenic hills.",
  highlights: ["Mall Road", "Jakhu Temple", "Christ Church", "Kufri"],
  bestTime: "March to June, October to December",
},
{
  id: "13",
  name: "Hampi, Karnataka",
  type: "Heritage Site",
  coordinates: { lat: 15.335, lng: 76.46 },
  rating: 4.6,
  image:
    "https://s7ap1.scene7.com/is/image/incredibleindia/a-journey-through-masthead-hero-1?qlt=82&ts=1727368343764",
  description:
    "A UNESCO World Heritage Site, Hampi is famous for its ancient temples, ruins, and stunning landscapes.",
  highlights: ["Virupaksha Temple", "Vijaya Vittala Temple", "Stone Chariot", "Hemakuta Hill"],
  bestTime: "October to March",
},
{
  id: "14",
  name: "Coorg, Karnataka",
  type: "Coffee Country",
  coordinates: { lat: 12.3375, lng: 75.8069 },
  rating: 4.7,
  image:
    "https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=800",
  description:
    "Also known as Kodagu, Coorg is famous for its coffee plantations, lush greenery, and waterfalls.",
  highlights: ["Abbey Falls", "Raja’s Seat", "Coffee Plantations", "Dubare Elephant Camp"],
  bestTime: "October to March",
},
{
  id: "15",
  name: "Kanyakumari, Tamil Nadu",
  type: "Coastal Town",
  coordinates: { lat: 8.0883, lng: 77.5385 },
  rating: 4.4,
  image:
    "https://images.pexels.com/photos/208745/pexels-photo-208745.jpeg?auto=compress&cs=tinysrgb&w=800",
  description:
    "Located at the southern tip of India, Kanyakumari is famous for its sunrise and sunset views over the ocean.",
  highlights: ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Kanyakumari Beach", "Sunset Point"],
  bestTime: "October to March",
},

  ];

  useEffect(() => {
    const initializeMap = async () => {
      try {
        const google = await loader.load();
        if (mapRef.current) {
          const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 20.5937, lng: 78.9629 },
            zoom: 5,
          });
          setMap(mapInstance);

          markersRef.current.forEach((m) => m.setMap(null));
          markersRef.current = [];

          locations.forEach((location) => {
            const marker = new google.maps.Marker({
              position: location.coordinates,
              map: mapInstance,
              title: location.name,
            });

            marker.addListener("click", () => {
              setSelectedLocation(location);
              mapInstance.panTo(location.coordinates);
              mapInstance.setZoom(7);
            });

            markersRef.current.push(marker);
          });
        }
      } catch (error) {
        console.error("Error loading Google Maps:", error);
      }
    };

    initializeMap();


  }, []);

  const handleZoomIn = () => {
    if (map) map.setZoom(map.getZoom() + 1);
  };

  const handleZoomOut = () => {
    if (map) map.setZoom(map.getZoom() - 1);
  };

  const handleRecenter = () => {
    if (map && selectedLocation) {
      map.panTo(selectedLocation.coordinates);
      map.setZoom(8);
    } else if (map) {
      map.panTo({ lat: 20.5937, lng: 78.9629 });
      map.setZoom(5);
    }
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating)
          ? "text-yellow-400 fill-current"
          : i < rating
            ? "text-yellow-400 fill-current opacity-50"
            : "text-gray-300"
          }`}
      />
    ));
  };

  return (
  
 <div className="bg-white rounded-2xl shadow-2xl overflow-hidden h-[36rem] flex flex-col lg:flex-row ">

    <div className="relative flex-1 min-h-[300px] sm:min-h-[400px]"> <div ref={mapRef} className="w-full h-full" />


      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={handleZoomIn}
          className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50"
        >
          <ZoomIn className="h-5 w-5 text-gray-600" />
        </button>
        <button
          onClick={handleZoomOut}
          className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50"
        >
          <ZoomIn className="h-5 w-5 text-gray-600 rotate-180" />
        </button>
        <button
          onClick={handleRecenter}
          className="bg-white p-3 rounded-xl shadow-md hover:shadow-xl hover:bg-blue-50"
        >
          <Navigation className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </div>

    <div className="w-full lg:w-96 p-8  border-t lg:border-t-0 lg:border-l border-gray-100 bg-gradient-to-b from-gray-50 to-white">
      {selectedLocation ? (
        <div>
          <img
            src={selectedLocation.image}
            alt={selectedLocation.name}
            className="w-full h-40 object-cover rounded-xl mb-4"
          />
          <h3 className="text-lg sm:text-xl font-bold">
            {selectedLocation.name}
          </h3>
          <div className="flex items-center my-2">
            {renderStars(selectedLocation.rating)}
            <span className="ml-2 text-gray-700 text-sm sm:text-base">
              {selectedLocation.rating}
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {selectedLocation.description}
          </p>
          <button
            onClick={() => setShowDetails(true)}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base"
          >
            <Info className="h-4 w-4 inline-block mr-2" />
            View Details
          </button>
        </div>
      ) : (
        <p className="text-gray-500 mt-10 sm:mt-20 text-center text-sm sm:text-base">
          Click on any marker to see location details
        </p>
      )}
    </div>

    {showDetails && selectedLocation && (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4">
        <div className="bg-white p-4 sm:p-6 rounded-xl max-w-lg w-full relative max-h-[90vh] overflow-y-auto">
          <button
            onClick={() => setShowDetails(false)}
            className="absolute top-3 right-3 text-gray-500"
          >
            <CircleX className="w-6 h-6" />
          </button>
          <img
            src={selectedLocation.image}
            alt={selectedLocation.name}
            className="w-full h-48 sm:h-60 object-cover rounded-lg mb-4"
          />
          <h2 className="text-lg sm:text-xl font-bold mb-2">
            {selectedLocation.name}
          </h2>
          <p className="text-gray-600 mb-4 text-sm sm:text-base">
            {selectedLocation.description}
          </p>
          <p className="text-sm font-semibold">
            Best Time: {selectedLocation.bestTime}
          </p>
        </div>
      </div>
    )}
  </div>


  );
};

export default MapView;
