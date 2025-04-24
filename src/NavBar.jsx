import { MapPin, Search } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { SearchContext } from './context/SearchContext';

const NavBar = ({ textColor }) => {
    const navigate = useNavigate();
    const { user, logout } = useContext(UserContext);
    const { location, setLocation, searchTerm, setSearchTerm } = useContext(SearchContext);

    const handleSearch = (e) => {
        e.preventDefault();
        navigate('/search');
    };

    return (
        <nav className="relative z-10 flex items-center justify-around px-8 py-3">
            <button onClick={() => navigate('/')} className={`cursor-pointer text-2xl font-bold ${textColor}`}>Quisine</button>
            <form
                className="w-full max-w-2xl bg-white rounded-full flex items-center px-4 py-2 shadow-md"
                onSubmit={handleSearch}
            >
                <div className="flex items-center bg-white rounded-full px-2 py-1">
                    <MapPin className="w-4 h-4 text-gray-700" />
                    <select
                        value={location}
                        onChange={e => setLocation(e.target.value)}
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
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Search for restaurant or a cuisine"
                    className="outline-none flex-grow text-gray-700 px-2"
                />
                <button className="bg-red-500 hover:bg-red-600 text-white rounded-full px-6 py-2 ml-2">
                    Search
                </button>
            </form>
            <div className={`flex space-x-10 text-xl ${textColor}`}>
                {user ? (
                    <>
                        <span className="cursor-pointer">Welcome, {user.name}</span>
                        <button className="cursor-pointer" onClick={logout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button className="cursor-pointer" onClick={() => navigate('/LoginPage')}>
                            Log in
                        </button>
                        <button className="cursor-pointer" onClick={() => navigate('/register')}>
                            Sign up
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;