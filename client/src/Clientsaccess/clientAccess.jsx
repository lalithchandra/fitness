import React, { useState, useEffect } from 'react';
import axios from 'axios';

function TrainerUsersList({ trainerId }) {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Fetch users under the trainer on component mount
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/api/users_under_trainer/${trainerId}`);
                setUsers(response.data.users); // Set the list of users
                setMessage(response.data.message); // Set the message (like success or no users)
            } catch (error) {
                console.error('Error fetching users:', error);
                setMessage('An error occurred while fetching the users.');
            }
        };

        if (trainerId) {
            fetchUsers();
        }
    }, [trainerId]); // Run this effect when the trainerId changes

    return (
        <div className="container">
            <h3>Users Under This Trainer</h3>
            {message && <p>{message}</p>} {/* Display message if exists */}
            {users.length === 0 ? (
                <p>No users assigned to this trainer.</p>
            ) : (
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            <strong>{user.name}</strong> - {user.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TrainerUsersList;
