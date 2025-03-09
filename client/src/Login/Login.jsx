import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/authContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleLogin(e) {
    e.preventDefault();

    axios.post('http://localhost:4000/api/auth/login', formData)
      .then((res) => {
        console.log('Login response', res);

        if (res.status === 200) {
          const { token, role, username } = res.data;

          // Save token, role, and username to localStorage
          localStorage.setItem('token', token);
          localStorage.setItem('role', role);
          localStorage.setItem('username', username);

          // Update user context with token, role, and username
          setUser({ token, role, username });
          alert("User logged in successfully")

          // Redirect based on role
          if (role === 'admin') {
            navigate('/admin-dashboard');  // Admin route
          } else {
            navigate('/');  // Member route
          }
        }
      })
      .catch((err) => {
        console.log('Error from login', err);
        alert('Login failed. Please check your credentials.');
      });
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
      <center><h2>Login</h2></center>
        <div>
          <input
            type="email"
            placeholder="Email ID"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
