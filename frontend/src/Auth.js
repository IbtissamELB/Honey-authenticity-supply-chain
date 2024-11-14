import React, { useState } from 'react';
import './Auth.css';

function Auth({ onLogin }) {
    const [userType, setUserType] = useState("consumer");

    const handleLogin = () => {
        onLogin(userType);
    };

    return (
        <div className="auth-container">
            <h2>Select User Type</h2>
            <div className="auth-options">
                <label>
                    <input
                        type="radio"
                        value="producer"
                        checked={userType === "producer"}
                        onChange={() => setUserType("producer")}
                    />
                    Producer
                </label>
                <label>
                    <input
                        type="radio"
                        value="consumer"
                        checked={userType === "consumer"}
                        onChange={() => setUserType("consumer")}
                    />
                    Consumer
                </label>
            </div>
            <button onClick={handleLogin}>Login as {userType}</button>
        </div>
    );
}

export default Auth;
