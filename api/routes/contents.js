const Content = require("../models/Content.js");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

// Get
router.get("/get-all", async (req, res) => {
    try {
        const contents = await Content.find();
        res.status(200).json(contents)
    } catch (error) {
        console.log(error)
    }
});


// Add
router.post("/add-content", authMiddleware, async (req, res) => {
    try {
        const newcontent = new Content(req.body);
        await newcontent.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});


// Update
router.put("/update-content", authMiddleware, async (req, res) => {
    try {
        await Content.findOneAndUpdate({ _id: req.body.contentId }, req.body);
        res.status(200).json("Item updated successfully.")
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete
router.delete("/delete-content", authMiddleware, async (req, res) => {
    try {
        await Content.findOneAndDelete({ _id: req.body.contentId });
        res.status(200).json("Item deleted successfully.");
    } catch (error) {
        res.status(500).json(error); 
    }
});


module.exports = router;