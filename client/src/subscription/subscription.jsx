import React, { useState } from 'react';
import axios from 'axios';

function SubscriptionPage({ userId }) {
    const [message, setMessage] = useState('');

    // Function to handle subscription click
    const handleSubscription = async (plan) => {
        try {
            const response = await axios.post('http://localhost:4000/api/subscriptions/apply-subscription', {
                userId,
                plan
            });
            setMessage(response.data.message);
        } catch (error) {
            console.error(error);
            setMessage(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <div className="container">
            <div className="row">
                {/* Basic Plan Card with proper style */}
                <div className="col-md-4 mb-4">
                    <div className="card" style={{ width: '18rem', backgroundColor: '#d4edda', color: 'black' }}>
                        <div className="card-body text-center">
                            <h5 className="card-title">Basic Plan</h5>
                            <p className="card-text">$10/month - Perfect for beginners</p>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => handleSubscription('Basic Plan')}
                            >
                                Get Subscription
                            </button>
                        </div>
                    </div>
                </div>

                {/* Premium Plan Card */}
                <div className="col-md-4 mb-4">
                    <div className="card" style={{ width: '18rem', backgroundColor: '#d4edda', color: 'black' }}>
                        <div className="card-body text-center">
                            <h5 className="card-title">Premium Plan</h5>
                            <p className="card-text">$20/month - Ideal for serious fitness enthusiasts</p>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => handleSubscription('Premium Plan')}
                            >
                                Get Subscription
                            </button>
                        </div>
                    </div>
                </div>

                {/* VIP Plan Card */}
                <div className="col-md-4 mb-4">
                    <div className="card" style={{ width: '18rem', backgroundColor: '#d4edda', color: 'black' }}>
                        <div className="card-body text-center">
                            <h5 className="card-title">VIP Plan</h5>
                            <p className="card-text">$30/month - Get exclusive features and benefits</p>
                            <button
                                className="btn btn-outline-dark"
                                onClick={() => handleSubscription('VIP Plan')}
                            >
                                Get Subscription
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Display message after applying for subscription */}
            {message && <div className="alert alert-info mt-4">{message}</div>}
        </div>
    );
}

export default SubscriptionPage;
