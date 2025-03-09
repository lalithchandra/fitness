import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context/authContext';  // Adjust the import path to your actual file

export default function Navigation() {
  const { user, logout } = useContext(AuthContext);  // Use useContext hook here

  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>

        {user ? (
          <>
            {/* Common Links for Logged-in Users */}
            <li><Link to="/subscription">Subscription Plan</Link></li> {/* Added Subscription Link */}
            <li><Link to="/BMI">BMI</Link></li>
            <li><Link to="/Recipe">Recipes</Link></li>
            {/* Links for Trainers */}
            {user.role === 'trainer' && (
              <>
                <li><Link to="/clentaccess">My Clients</Link></li>
              </>
            )}

            {/* Links for Admin */}
            {user.role === 'admin' && (
              <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
            )}

            {/* Logout Button */}
            <li><button onClick={logout}>Logout</button></li>
          </>
        ) : (
          <>
            {/* Links for Unauthenticated Users */}
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}
