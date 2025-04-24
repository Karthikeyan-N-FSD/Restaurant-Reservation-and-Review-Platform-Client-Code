import { useState } from 'react';
import { StarIcon } from '@heroicons/react/24/solid';
import { UserCircleIcon } from '@heroicons/react/24/outline';

// Mock data for reviews - Replace with actual data from your API
const mockReviews = [
    {
        id: '1',
        user: 'Neeraj',
        rating: 4,
        text: 'Good service',
        date: '2 months ago',
    },
    {
        id: '2',
        user: 'Arun Isaac',
        rating: 2,
        text: 'Poor service and the sound was not managed well. Felt the customers are being treated differently.',
        date: '2 months ago',
    },
    {
        id: '3',
        user: 'Nishant Solanki',
        rating: 5,
        text: 'Amazing service staffs were very polite and friendly',
        date: '3 months ago',
    },
    {
        id: '4',
        user: 'Nishant Solanki',
        rating: 4,
        text: 'Nice place',
        date: '3 months ago',
    },
    {
        id: '5',
        user: 'Gaurav Jain',
        rating: 5,
        text: 'Best place to visit in Chennai good atmosphere and all thanks to Dinesh for giving good service',
        date: '3 months ago',
    },
];

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white rounded-lg p-4 mb-4 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                    <div>
                        <p className="font-semibold text-gray-800">{review.user}</p>
                        <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <StarIcon
                                    key={i}
                                    className={`h-4 w-4 ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <p className="text-gray-700 text-sm mb-2">{review.text}</p>
            <p className="text-gray-500 text-xs mb-2">{review.date}</p>
        </div>
    );
};

const ReviewSection = () => {
    const [reviews, setReviews] = useState(mockReviews);
    const [sortOrder, setSortOrder] = useState('newest'); // 'newest' or 'oldest'

    const sortedReviews = [...reviews].sort((a, b) => {
        if (sortOrder === 'newest') {
            return new Date(b.date) - new Date(a.date); // Sort descending (newest first)
        } else {
            return new Date(a.date) - new Date(b.date); // Sort ascending (oldest first)
        }
    });

    return (
        <div className="p-4">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Message In A Bottle Reviews</h2>
            <div className="flex justify-between items-center mb-4">
                <span className="text-sm text-gray-600">All Reviews</span>
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 focus:ring-blue-500 focus:border-blue-500"
                >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                </select>
            </div>
            {sortedReviews.map(review => (
                <ReviewCard key={review.id} review={review} />
            ))}
            <div className="flex justify-center mt-4">
                {/* Basic Pagination -  In a real app, you'd use a library or more complex logic */}
                <button className="mx-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">1</button>
                <button className="mx-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">2</button>
                <button className="mx-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">3</button>
                <button className="mx-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">4</button>
                <button className="mx-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">5</button>
                <button className="mx-1 px-3 py-1 border rounded text-gray-700 hover:bg-gray-100">Next</button>
            </div>
        </div>
    );
};

export default ReviewSection;