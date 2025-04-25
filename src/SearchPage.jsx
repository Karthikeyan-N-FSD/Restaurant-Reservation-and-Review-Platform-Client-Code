import React, { useState, useEffect, useContext } from 'react';
import RestaurantCard from './RestaurantCard';
import axios from 'axios';
import { SearchContext } from './context/SearchContext';

const FilterButton = ({ text, isSelected, onClick }) => (
  <button
    className={`px-3 py-1.5 border rounded-lg text-sm transition-colors duration-200 whitespace-nowrap ${
      isSelected ? 'bg-gray-300 text-gray-800' : 'border-gray-300 text-gray-600 hover:bg-gray-100'
    }`}
    onClick={onClick}
  >
    {text}
  </button>
);

const SearchPage = () => {
  const { location, searchTerm } = useContext(SearchContext);
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);

  const availableFilters = ["Live Music", "Valet Parking", "Outdoor Seating", "Pet Friendly", "Serves Alcohol"];

  // Fetch restaurants from backend
  const fetchRestaurants = async () => {
    setLoading(true);
    try {
      const params = {};
      if (location) params.location = location;
      if (searchTerm) params.q = searchTerm;
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/restaurants`, { params });
      setRestaurants(res.data);
    } catch (err) {
      setRestaurants([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchRestaurants();
    // eslint-disable-next-line
  }, [location, searchTerm]);

  // Filter restaurants based on selected filters
  const filteredRestaurants = restaurants.filter((restaurant) =>
    selectedFilters.every((filter) => restaurant.info?.includes(filter))
  );

  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <main className="container mx-auto px-4 py-6">
        {/* Filter Bar */}
        <div className="flex items-center space-x-3 overflow-x-auto pb-2 mb-6">
          {availableFilters.map((filter) => (
            <FilterButton
              key={filter}
              text={filter}
              isSelected={selectedFilters.includes(filter)}
              onClick={() => toggleFilter(filter)}
            />
          ))}
        </div>

        {/* Content Header */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Best Food in {location}
        </h2>

        {/* Restaurant Grid */}
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">No restaurants found.</div>
            ) : (
              filteredRestaurants.map((restaurant) => (
                <RestaurantCard
                  key={restaurant._id || restaurant.id}
                  restaurant={{
                    ...restaurant,
                    cuisine: Array.isArray(restaurant.cuisines)
                      ? restaurant.cuisines.join(', ')
                      : restaurant.cuisine,
                    imageUrl: restaurant.mainImage
                      ? `${import.meta.env.VITE_BACKEND_URL}/uploads/${restaurant.mainImage}`
                      : "https://placehold.co/300x200/eee/ccc?text=No+Image",
                  }}
                />
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SearchPage;
