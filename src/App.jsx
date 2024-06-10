import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './api/context/AuthContext';
import { Home, Login, Register, Venue, Venues, Profile, VenueBookingsPage, AddVenuePage, BookingsPage, MyVenuesPage } from './pages';
import { Nav, Footer, ScrollToTop } from './components';




const App = () => {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Nav />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/venues" element={<Venues />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="venue/:id" element={<Venue />} />
          <Route path="/venue/:id/bookings" element={<VenueBookingsPage />} />
          <Route path="/venue/add" element={<AddVenuePage />} />
          <Route path="/bookings" element={<BookingsPage />} />
          <Route path="/profile/venues" element={<MyVenuesPage />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;