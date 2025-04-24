import React from 'react';
import { Star } from 'lucide-react';
import { useNavigate } from 'react-router';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();
    return (
        <div
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out cursor-pointer border border-gray-100"
            onClick={() => navigate(`/restaurant/${restaurant._id}/info`)}
        >
            {/* Image Section */}
            <div className="relative h-48">
                <img
                    className="w-full h-full object-cover"
                    src={restaurant.imageUrl}
                    alt={restaurant.name}
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/eee/ccc?text=Image+Error"; }}
                />
                
            </div>

            {/* Details Section */}
            <div className="p-4">
                {/* Name and Rating */}
                <div className="flex justify-between items-center mb-1">
                    <h3 className="text-lg font-semibold text-gray-800 truncate" title={restaurant.name}>
                        {restaurant.name}
                    </h3>
                    {/* Rating Badge */}
                    {restaurant.rating && (
                        <div className={`flex items-center rounded px-1.5 py-0.5 text-xs font-bold text-white ${restaurant.rating === 'NEW' ? 'bg-green-500' : 'bg-green-600'}`}>
                            {restaurant.rating}
                            {restaurant.rating !== 'NEW' && <Star size={12} className="ml-1 fill-white" />}
                        </div>
                    )}
                </div>

                {/* Cuisine and Price */}
                <div className="flex justify-between items-start text-sm text-gray-600 mb-2">
                    <p className="truncate w-3/5" title={restaurant.cuisine}>{restaurant.cuisine}</p>
                    <p className="text-right w-2/5">₹{restaurant.priceForTwo} for two</p>
                </div>

                {/* Location and Distance */}
                <div className="flex justify-between items-center text-xs text-gray-500">
                    <p className="truncate">{restaurant.address}</p>
                    
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;