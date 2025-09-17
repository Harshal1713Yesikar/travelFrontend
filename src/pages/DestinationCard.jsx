import React from 'react';
import { Heart, Star, MapPin } from 'lucide-react';
import { useWishlist } from '../hooks/useWishlist';
import { useLanguage } from '../contexts/LanguageContext';

const DestinationCard = ({ destination }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();

  const handleWishlistToggle = () => {
    const wishlistItem = {
      id: destination.id,
      name: destination.name,
      image: destination.image,
      price: destination.price,
      rating: destination.rating,
      type: destination.type
    };

    if (isInWishlist(destination.id)) {
      removeFromWishlist(destination.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlistToggle}
          className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <Heart
            className={`h-5 w-5 transition-colors duration-200 ${
              isInWishlist(destination.id)
                ? 'text-red-500 fill-red-500'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          />
        </button>
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm font-medium">
          ₹{destination.price.toLocaleString()}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
            {destination.name}
          </h3>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {destination.rating}
            </span>
          </div>
        </div>

        <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{destination.location}</span>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {destination.description}
        </p>

        <div className="flex space-x-3">
          <button className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 font-medium">
            {t('book.now')}
          </button>
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
            {t('view.details')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DestinationCard;
