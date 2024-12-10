import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function Home() {
    const [jobs, setJobs] = useState([]);
    const [appliedJobs, setAppliedJobs] = useState({}); // Track which jobs have been applied to

    // Load applied jobs from localStorage on component mount
    useEffect(() => {
        const storedAppliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || {};
        setAppliedJobs(storedAppliedJobs);

        axios.get('http://localhost:5000/api/jobs')
            .then(response => setJobs(response.data))
            .catch(err => console.error(err));
    }, []);

    // Handle applying to a job
    const applyToJob = (jobId) => {
        const newAppliedJobs = { ...appliedJobs, [jobId]: 'applied' };
        setAppliedJobs(newAppliedJobs);

        // Store the applied jobs in localStorage
        localStorage.setItem('appliedJobs', JSON.stringify(newAppliedJobs));

        alert(`Applied to job with ID: ${jobId}`);
    };

    // Handle withdrawing an application
    const withdrawApplication = (jobId) => {
        const newAppliedJobs = { ...appliedJobs, [jobId]: 'withdrawn' };
        setAppliedJobs(newAppliedJobs);

        // Remove the applied job from localStorage
        localStorage.setItem('appliedJobs', JSON.stringify(newAppliedJobs));

        alert(`Withdrew application for job with ID: ${jobId}`);
    };

    return (
        <div className="home-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="navbar-logo">
                    <Link to="/" className="navbar-link">JobPortal</Link>
                </div>
                <div className="navbar-links">
                    <Link to="/home" className="navbar-link">Home</Link>
                    {/* <Link to="/jobs" className="navbar-link">Jobs</Link> */}
                    <Link to="/create" className="navbar-link">Admin</Link>
                    <Link to="/profile" className="navbar-link">Profile</Link>
                    <Link to="/" className="navbar-link">Log Out</Link>
                </div>
            </nav>

            {/* Job Listings */}
            <h1>Job Listings</h1>
            <div className="job-list">
                {jobs.map((job) => (
                    <div className="job-card" key={job._id}>
                        <h2>{job.title}</h2>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p>{job.description}</p>
                        <div className="button-group">
                            {/* Apply button */}
                            {!appliedJobs[job._id] && (
                                <button
                                    className="apply-button"
                                    onClick={() => applyToJob(job._id)}
                                >
                                    Apply
                                </button>
                            )}

                            {/* Already Applied */}
                            {appliedJobs[job._id] === 'applied' && (
                                <>
                                    <button
                                        className="apply-button applied"
                                        disabled
                                    >
                                        Already Applied
                                    </button>
                                    <button
                                        className="withdraw-button"
                                        onClick={() => withdrawApplication(job._id)}
                                    >
                                        Withdraw
                                    </button>
                                </>
                            )}

                            {/* Withdrawn */}
                            {appliedJobs[job._id] === 'withdrawn' && (
                                <button
                                    className="apply-button"
                                    onClick={() => applyToJob(job._id)}
                                >
                                    Apply Again
                                </button>
                            )}
                        </div>

                        {/* Job Status Display */}
                        <div className="job-status">
                            {appliedJobs[job._id] === 'applied' && (
                                <span className="status applied-status">Status: Applied</span>
                            )}
                            {appliedJobs[job._id] === 'withdrawn' && (
                                <span className="status withdrawn-status">Status: Withdrawn</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
