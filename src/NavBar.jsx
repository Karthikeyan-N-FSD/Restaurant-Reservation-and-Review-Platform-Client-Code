import { MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router';

const NavBar = () => {
    const navigate = useNavigate();

    return (
        <nav className="relative z-10 flex items-center justify-around px-8 py-3">
            <button onClick={() => navigate('/')} className="text-gray-200 cursor-pointer text-2xl font-bold">Qusine</button>
            <div className="w-full max-w-2xl bg-white rounded-full flex items-center px-4 py-2 shadow-md">
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
                <button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 ml-2">
                    Search
                </button>
            </div>
            <div className="flex space-x-10 text-xl ">
                
                <button className="text-gray-200 cursor-pointer" onClick={() => navigate('/LoginPage')}>Log in</button>
                <button className="text-gray-200 cursor-pointer" onClick={() => navigate('/register')}>Sign up</button>
            </div>
        </nav>
    );
};

export default NavBar;