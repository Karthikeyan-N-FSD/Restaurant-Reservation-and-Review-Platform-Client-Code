import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

function ProductsPage() {
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`https://kaz-password-reset.onrender.com/products`)
            .then((res) => setProducts(res.data))
            .catch((err) => {
                console.error("Unauthorized or Error:", err);
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    delete axios.defaults.headers.common['Authorization'];
                    navigate('/');
                }
            });
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['Authorization'];
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Header */}
            <div className="flex justify-between items-center bg-white px-6 py-4 shadow">
                <h1 className="text-2xl font-bold text-gray-800">Products</h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            {/* Product List */}
            <div className="p-6">
                <ul className="space-y-4">
                    {products.map((product, index) => (
                        <li key={index} className="bg-white p-4 rounded shadow">
                            <p className="text-lg font-semibold">{product.title}</p>
                            <p className="text-gray-600">₹{product.price.toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductsPage;
