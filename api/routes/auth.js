const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

// Admin credentials
const adminCredentials = {
    username: "username",
    password: "password"
};

// Login route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        if (email === adminCredentials.email) {

            const isMatch = await bcrypt.compare(password, bcrypt.hashSync(adminCredentials.password, 10));
            if (!isMatch) {
                return res.status(400).json({ msg: "Invalid credentials" });
            }

            // Token oluştur
            const payload = { email: adminCredentials.email };
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

            return res.json({ token });
        } else {
            return res.status(400).json({ msg: "Access denied" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json("Server error");
    }
});


router.get('/check-token', authMiddleware, (req, res) => {

    res.json({ valid: true });
    console.log("log");
    
});

module.exports = router;
