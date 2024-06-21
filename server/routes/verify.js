const Account = require('../models/Account');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/:token', async (req, res) => {
    const token = req.params.token;
    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
        // The decoded payload should contain the user id
        const username = decoded.username;
        const user = await Account.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update the user's status to "active"
        user.status = 'active';
        await user.save();

        res.json({ message: 'Account activated', username: user.username});
    } catch (error) {
        console.log(error);
        if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ message: 'Invalid token' });
        } else {
            res.status(500).json({ message: 'An error occurred' });
        }
    }
});

module.exports = router;
