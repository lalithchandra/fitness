import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import Recipe from './Recipe/Recipe'
import BMI from './BMI/BMI'
import './styles/Home.css'
import './styles/Login.css'
import './styles/Register.css'
import './styles/Navigation.css'
import { AuthProvider } from './Context/authContext';  // Ensure this is imported
import Navigation from './Navigation/Navigation';
import SubscriptionPage from  "./subscription/subscription"
import Accessclient from "./Clientsaccess/clientAccess"
import Home from './Home/Home'
export default function App() {
  return (
    <div>
      <BrowserRouter>
        {/* Wrap your application in AuthProvider */}
        <AuthProvider>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/clentaccess"  element={<Accessclient/>} />
            <Route path="/BMI"  element={<BMI/>} />
            <Route path="/Recipe"  element={<Recipe/>} />
          <Route path="/subscription" element={<SubscriptionPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            {/* Add other routes as necessary */}
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

