const express = require('express');
const router = express.Router();
const Profile = require('../models/Profile');

// POST route to create or update profile
router.post('/profile', async (req, res) => {
    const { name, email, description } = req.body;

    try {
        let profile = await Profile.findOne({ email });

        if (profile) {
            // If the profile exists, update it
            profile.name = name;
            profile.description = description;
            await profile.save();
            return res.status(200).json({ message: 'Profile updated successfully!', profile });
        }

        // Create a new profile if none exists
        profile = new Profile({ name, email, description });
        await profile.save();
        res.status(201).json({ message: 'Profile created successfully!', profile });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// GET route to fetch profile by email
router.get('/profile', async (req, res) => {
    const { email } = req.query;

    try {
        const profile = await Profile.findOne({ email });
        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
