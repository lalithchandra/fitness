import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../Context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        mobile: '',
        role: '', // Change from roles to role
    });
    const [error, setError] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log(formData);

        // Reset error state before making request
        setError('');

        // Make the POST request to register the user
        axios.post("http://localhost:4000/api/auth/signup", formData)
            .then((res) => {
                console.log("response from register", res);
                
                if (res.data.token) {
                    // Registration successful
                    localStorage.setItem("token", res.data.token);
                    localStorage.setItem("role", res.data.role);
                    localStorage.setItem("username", formData.username);
                    
                    // Set user data in global context
                    setUser({ 
                        token: res.data.token, 
                        role: res.data.role,
                        username: formData.username 
                    });
                    
                    // Alert success and navigate
                    alert("Registration successful!");
                    navigate('/'); // Navigate to home or login page
                }
            })
            .catch((err) => {
                // Check if the error is due to existing user
                if (err.response && err.response.data) {
                    if (err.response.status === 400 && 
                        err.response.data.message && 
                        err.response.data.message.includes('already exists')) {
                        setError('User with this email already exists');
                    } else {
                        setError(err.response.data.message || 'Registration failed');
                    }
                } else {
                    setError('Registration failed. Please try again.');
                }
            });
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2 className="register-heading">REGISTRATION</h2>
                
                {error && <div className="error-message">{error}</div>} {/* Display error here */}
                
                <div>
                    <input
                        type="text"
                        placeholder="Name"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                    />
                </div>
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
                <div>
                    <input
                        type="text"
                        placeholder="Mobile Number"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <select
                        name="role" // Change from roles to role
                        value={formData.role}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="trainer">Trainer</option>
                        <option value="customer">Customer</option>
                    </select>
                
                    </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
