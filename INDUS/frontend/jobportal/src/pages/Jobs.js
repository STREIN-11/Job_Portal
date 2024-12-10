// src/pages/Jobs.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Jobs() {
    const [jobsWithApplicants, setJobsWithApplicants] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/jobs/applied')
            .then((response) => {
                setJobsWithApplicants(response.data); // Store the jobs with applicants in the state
            })
            .catch((err) => {
                console.error('Error fetching jobs with applicants:', err);
            });
    }, []);

    return (
        <div className="job-list-container">
            <h1>Jobs Applied</h1>
            <div className="job-list">
                {jobsWithApplicants.map((job) => (
                    <div className="job-card" key={job._id}>
                        <h2>{job.title}</h2>
                        <p><strong>Company:</strong> {job.company}</p>
                        <p><strong>Location:</strong> {job.location}</p>
                        <p>{job.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Jobs;
