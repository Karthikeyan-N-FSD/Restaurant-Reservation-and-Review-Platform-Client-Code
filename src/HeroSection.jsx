import { useState } from "react";
import { useNavigate } from "react-router";
import bgImage from './assets/bg_image.jpg';
import { MapPin, Search } from 'lucide-react';

const HeroSection = () => {
    const navigate = useNavigate();

    return (
        <div className="relative w-full h-screen bg-gray-100">
            <div
                className="absolute inset-0 bg-cover bg-center opacity-90"
                style={{
                    backgroundImage: `url(${bgImage})`,
                }}
            ></div>

            {/* Dark overlay for text contrast */}
            <div className="absolute inset-0 bg-black/40"></div>

            {/* Navigation Bar */}
            <nav className="relative z-10 flex items-center justify-end px-8 py-9">
                <div className="flex space-x-10 text-2xl ">
                    <button className="text-white cursor-pointer" >Add restaurant</button>
                    <button className="text-white cursor-pointer" onClick={() => navigate('/LoginPage')}>Log in</button>
                    <button className="text-white cursor-pointer" onClick={() => navigate('/register')}>Sign up</button>
                </div>
            </nav>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col gap-5 items-center h-full max-w-4xl mx-auto px-4">
                <div className="text-white text-9xl font-bold">Quisine</div>
                <h1 className="text-white text-3xl sm:text-5xl font-medium text-center mb-6">
                    Find the best restaurants in TamilNadu
                </h1>

                {/* Search Section */}
                <div className="w-full max-w-3xl bg-white rounded-full flex items-center px-4 py-2 shadow-md">
                    <div className="flex items-center bg-white rounded-full px-2 py-1">
                        <MapPin className="w-4 h-4 text-gray-700" />
                        <select
                            defaultValue="Chennai"
                            className="outline-none text-gray-700 flex-grow sm:flex-grow-0 w-28 sm:w-40 px-2 bg-transparent"
                        >
                            <option value="All">All</option>
                            <option value="Chennai">Chennai</option>
                            <option value="Coimbatore">Coimbatore</option>
                        </select>
                    </div>
                    <span className="text-gray-400 mx-2">|</span>
                    <Search className="w-4 h-4 mr-2" />
                    <input
                        type="text"
                        placeholder="Search for restaurant or a cuisine"
                        className="outline-none flex-grow text-gray-700 px-2"
                    />
                    <button className="bg-red-500 hover:bg-red-600 cursor-pointer text-white rounded-full px-6 py-2 ml-2">
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
