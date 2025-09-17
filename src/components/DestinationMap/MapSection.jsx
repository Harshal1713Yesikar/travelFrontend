import React from 'react'
import MapView from './MapView'

const MapSection = () => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Destinations
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover hotels, attractions, and restaurants on our interactive map
          </p>
        </div>
        <MapView />
      </div>

   
    </section>
  )
}

export default MapSection