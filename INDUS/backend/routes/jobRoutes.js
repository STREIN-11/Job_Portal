const express = require('express');
const Job = require('../models/Job');
const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find();
        res.status(200).json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new job
router.post('/', async (req, res) => {
    const { title, company, location, description } = req.body;

    const newJob = new Job({ title, company, location, description });
    try {
        const savedJob = await newJob.save();
        res.status(201).json(savedJob);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




router.post('/apply/:jobId', async (req, res) => {
    const { userId } = req.body; // Get userId from the request body
    const jobId = req.params.jobId; // Get jobId from the URL parameter

    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        // Add the userId to the applicants list if not already applied
        if (job.applicants.includes(userId)) {
            return res.status(400).json({ message: 'You have already applied for this job' });
        }

        job.applicants.push(userId);
        await job.save();

        res.status(200).json({ message: 'Applied to job successfully', job });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ message: 'Error applying to job', error });
    }
});

// Get applied jobs by user
router.get('/jobs/applied/:userId', async (req, res) => {
    const userId = req.params.userId;
    try {
        const appliedJobs = await Job.find({ applicants: userId });
        res.status(200).json(appliedJobs);
    } catch (error) {
        console.error('Error fetching applied jobs:', error);
        res.status(500).json({ message: 'Error fetching applied jobs', error });
    }
});

module.exports = router;
