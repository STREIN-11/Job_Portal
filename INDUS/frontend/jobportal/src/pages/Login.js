import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Ensure Login CSS is imported

function Login() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = () => {
        axios
            .post('http://localhost:5000/api/login', { email, name })
            .then(() => {
                navigate('/home'); // Redirect to Home page
            })
            .catch((err) => {
                setError(err.response?.data?.message || 'Login failed');
            });
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <h1 className="main-heading">Job a Thon</h1> {/* Added heading here */}
                <h2 className="login-heading">Login to your account</h2> {/* Subheading for the login form */}
                {error && <p className="error-message">{error}</p>}
                <input
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"  
                    placeholder="User name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    );
}

export default Login;
