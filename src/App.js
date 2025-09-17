import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contect from "./pages/Contact"
import SighupPage from "./pages/SighUpPage";
import Booking from "./pages/Booking";
import HotelList from "./pages/HotelList";
import FlightSearch from "./pages/Flight";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import Admin from "./pages/Admin";
import { LanguageProvider } from "./contexts/LanguageContext";

const App = () => {
  
  return (
       <LanguageProvider>

    <Router>
      <Layout>
        <Routes>
            <>
              <Route path="/" element={<Home />} />
              <Route path="/hotelList" element={<HotelList />} />
              <Route path="/Flight" element={<FlightSearch />} />
              <Route  path="/contactUs" element={<Contect/>}/>
              <Route path="/booking" element={<Booking />} />
              <Route path="/login" element={<Login />}/>
              <Route path="/sighup" element={<SighupPage />} />
              <Route path="/admin" element={<Admin/>}/>
            </>
        </Routes> 
      </Layout>
    </Router>
       </LanguageProvider>
  );
};

export default App;
