const User = require("../models/User.js");
const express = require("express");
const router = express.Router();



// Get all
router.get("/get-all", async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error);
    }
});



// Get a user
router.get("/", async (req, res) => {
    const userId = req.body.userId;
    try {
        const user = await User.findById(userId);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;