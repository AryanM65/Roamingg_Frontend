import { Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
function App() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          {/* Here no protected routes are required */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;
