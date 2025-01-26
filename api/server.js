const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const logger = require("morgan");
const app = express();

dotenv.config();

const port = process.env.PORT || 5000;

// routes
const blogRoute = require("./routes/blogs.js");
const authRoute = require("./routes/auth.js");
const contentRoute = require("./routes/contents.js");



const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Connected to MongoDB`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(cors());


// Routes
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('Surrogate-Control', 'no-store');
    next();
});
app.use("/api/blogs", blogRoute);
app.use("/api/contents", contentRoute);
app.use("/api/auth", authRoute);


app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => {
    connect();
    console.log(`Example app listening on port ${port}`);
});