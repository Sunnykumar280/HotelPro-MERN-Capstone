import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyBookings from './pages/MyBookings';
import Admin from './pages/Admin';

export default function App() {
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  return (
    <>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<div className="container"><Login /></div>} />
        <Route path="/register" element={<div className="container"><Register /></div>} />
        <Route path="/bookings" element={user ? <div className="container py-4"><MyBookings /></div> : <Navigate to="/login" />} />
        <Route path="/admin" element={user?.isAdmin ? <div className="container py-4"><Admin /></div> : <Navigate to="/" />} />
      </Routes>
      <Footer />
    </>
  );
}
