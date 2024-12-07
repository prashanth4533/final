import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js'; // Import PayPalScriptProvider
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import RoutePage from './pages/Route'; // Renamed component
import Payment from './pages/Payment';
import PrivateRoute from './components/PrivateRoute'; // Import the PrivateRoute component

import './styles/Login.css';
import './styles/Payment.css';
import './styles/home.css';
import './styles/Navbar.css';
import './styles/Route.css';

const App = () => {
  return (
    // Wrap the entire app with PayPalScriptProvider
    <PayPalScriptProvider options={{ "client-id": "ATqitXJDc5JNEb2DrEQY0Qa5KykfjEsjYT2eKLRzmEHNPO0tUS-ELHIOC6C4eboU-J7kGmSw4Fe7CZ4j" }}>
      <Router>
        <MainContent />
      </Router>
    </PayPalScriptProvider>
  );
};

const MainContent = () => {
  const location = useLocation();

  // Check if Navbar should be shown (on all pages except Login and Register)
  const showNavbar = location.pathname !== '/' && location.pathname !== '/register';

  return (
    <>
      {/* Conditionally render Navbar */}
      {showNavbar && <Navbar />}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/payment" element={<Payment />} />


        {/* Other Routes */}
        <Route path="/route" element={<RoutePage />} />
      </Routes>
    </>
  );
};

export default App;
