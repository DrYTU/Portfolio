const mongoose = require("mongoose");


const BlogSchema = mongoose.Schema(
    {
        title: {type: String, required: true},
        summary: {type: String, required: true},
        category: {type: String, required: true},
        content: {type: Array, required: true},
        imgPath: {type: String, required: true},
        tags: {type: Array, required: true},
        viewNum: {type: Number, default: 0},
        likeNum: {type: Number, default: 0},
        dislikeNum: {type: Number, default: 0},
    },
    { timestamps:true }
);

const Blog = mongoose.model("blogs", BlogSchema)

module.exports = Blog;