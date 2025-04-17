import { BrowserRouter, Routes, Route, Outlet } from 'react-router';
import HeroSection from "./HeroSection";
import LoginPage from "./LoginPage";
import ForgotPasswordPage from './ForgotPasswordPage';
import RegisterPage from './RegisterPage';
import VerifyAccountPage from './VerifyAccountPage';
import ProductsPage from './ProductsPage';
import ResetPasswordPage from './ResetPasswordPage';
import NavBar from "./NavBar";
import bgImage from './assets/bg_image.jpg';
import './App.css';
import axios from 'axios';

function App() {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Route without NavBar */}
        <Route path="/" element={<HeroSection />} />

        {/* Routes with NavBar */}
        <Route element={<LayoutWithNavBar />}>
          <Route path="/LoginPage" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify-account/:token" element={<VerifyAccountPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

// Layout component with NavBar
function LayoutWithNavBar() {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 -z-10"
        style={{
          backgroundImage: `url(${bgImage})`,
        }}
      ></div>
      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      {/* NavBar */}
      <NavBar className="relative z-10" />

      {/* Main Content */}
      <div className="flex-grow relative z-10">
        <Outlet />
      </div>
    </div>
  );
}
// function LayoutWithNavBar() {
//   return (
//     <div className="relative min-h-screen">
//       <div
//         className="absolute inset-0 bg-cover bg-center opacity-90"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//         }}
//       ></div>
//       <div className="absolute inset-0 bg-black/40"></div>
//       <NavBar className="relative z-10" />
//       <Outlet className="relative z-10" />
//     </div>
//   );
// }

export default App;