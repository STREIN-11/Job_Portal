import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './CreateJob.css'; // Import the CSS file

function CreateJob() {
    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
    });

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/jobs', formData)
            .then(response => {
                alert('Job Created!');
                setFormData({ title: '', company: '', location: '', description: '' });
                navigate('/'); // Redirect to the Home page
            })
            .catch(err => console.error(err));
    };

    return (
        <div className="create-job-container">
            <h1>Create Job</h1>
            <form onSubmit={handleSubmit} className="job-form">
                <input
                    type="text"
                    name="title"
                    placeholder="Job Title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="company"
                    placeholder="Company"
                    value={formData.company}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={formData.location}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                ></textarea>
                <button type="submit" className="submit-button">Create Job</button>
            </form>
        </div>
    );
}

export default CreateJob;
