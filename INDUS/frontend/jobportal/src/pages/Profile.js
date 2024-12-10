import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Profile.css';

function Profile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);  
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        description: ''
    });
    const navigate = useNavigate();  

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/profile')
            .then((response) => {
                setProfile(response.data);
                setFormData({
                    name: response.data.name,
                    email: response.data.email,
                    description: response.data.description
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching profile:', error);
                setLoading(false);
            });
    }, []);

    const handleEditClick = () => {
        setIsEditing(true); 
    };

    const handleCancelEdit = () => {
        setIsEditing(false);
        setFormData({
            name: profile.name,
            email: profile.email,
            description: profile.description
        });  
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
       
        axios
            .put('http://localhost:5000/api/profile', formData)
            .then((response) => {
                setProfile(response.data);  
                setIsEditing(false);  
            })
            .catch((error) => {
                console.error('Error updating profile:', error);
            });
    };

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!profile) {
        return (
            <div className="profile-container">
                <h1>No Profile Found</h1>
                <p>Create your profile by clicking "Create Profile."</p>
            </div>
        );
    }

    return (
        <div>
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-link">JobPortal</Link>
                </div>
                <div className="navbar-links">
                    <Link to="/home" className="navbar-link">Home</Link>
                    <Link to="/jobs" className="navbar-link">Jobs</Link>
                    <Link to="/create" className="navbar-link">Admin</Link>
                    <Link to="/profile" className="navbar-link">Profile</Link>
                    <Link to="/" className="navbar-link">Log Out</Link>
                </div>
            </nav>

            {/* Profile Content */}
            <div className="profile-container">
                <div className="profile-card">
                    <h2>{isEditing ? 'Edit Profile' : profile.name}</h2>

                    {isEditing ? (
                        <form onSubmit={handleSubmit}>
                            <div>
                                <label>Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Description:</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="button-group">
                                <button type="submit">Save</button>
                                <button type="button" onClick={handleCancelEdit}>Cancel</button>
                            </div>
                        </form>
                    ) : (
                        <>
                            <p><strong>Email:</strong> {profile.email}</p>
                            <p><strong>Description:</strong> {profile.description}</p>
                            <button onClick={handleEditClick}>Edit Profile</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Profile;
