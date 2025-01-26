const Blog = require("../models/Blog.js");
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware"); // JWT Middleware dahil ediliyor

// Get
router.get("/get-all", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs)
    } catch (error) {
        console.log(error)
    }
});


// Add
router.post("/add-blog", authMiddleware, async (req, res) => {
    try {
        const newblog = new Blog(req.body);
        await newblog.save();
        res.status(200).json("Item added successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});


// Update
router.put("/update-blog", authMiddleware, async (req, res) => {
    try {
        await Blog.findOneAndUpdate({ _id: req.body.blogId }, req.body);
        res.status(200).json("Item updated successfully.")
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete
router.delete("/delete-blog", authMiddleware, async (req, res) => {
    try {
        await Blog.findOneAndDelete({ _id: req.body.blogId });
        res.status(200).json("Item deleted successfully.");
    } catch (error) {
        res.status(500).json(error); 
    }
});


module.exports = router;