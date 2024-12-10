const express = require('express');
const Profile = require('../models/Profile');
const router = express.Router();

// Fetch the first profile in the database
router.get('/profile', async (req, res) => {
    try {
        const profile = await Profile.findOne();
        if (!profile) return res.status(404).json({ message: 'No profile found' });
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Create or update the first profile in the database
router.post('/profile', async (req, res) => {
    const { name, email, description } = req.body;
    try {
        let profile = await Profile.findOne();
        if (profile) {
            profile.name = name;
            profile.email = email;
            profile.description = description;
            await profile.save();
        } else {
            profile = new Profile({ name, email, description });
            await profile.save();
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

// Login endpoint
router.post('/login', async (req, res) => {
    const { email, name } = req.body;
    try {
        const profile = await Profile.findOne({ email, name });
        if (!profile) return res.status(401).json({ message: 'Invalid email or name' });
        res.status(200).json({ message: 'Login successful', profile });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});


router.put('/profile', async (req, res) => {
    const { name, email, description } = req.body;

    try {
        // Find the profile (assuming there's only one profile in the DB)
        const profile = await Profile.findOne();

        if (!profile) {
            return res.status(404).json({ message: 'Profile not found' });
        }

        // Update profile fields
        profile.name = name;
        profile.email = email;
        profile.description = description;

        // Save the updated profile
        await profile.save();

        // Send the updated profile data back to the client
        res.status(200).json(profile);
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error', error });
    }
});
module.exports = router;
