const mongoose = require("mongoose");

const ContentSchema = mongoose.Schema(
    {
        titles: {type: Array, required: true},
        HomeWhoIAm: {type: String, required: true},
        AboutWhoIAm: {type: String, required: true},
        hobbies: {type: Array, required: true},
        quote: {type: String, required: true},
        quoteOwner: {type: String, required: true},
        github: {type: Number, required: true},
        kaggle: {type: Number, required: true},
        projects: {type: Array,}
    },
    { timestamps:true }
);

const Content = mongoose.model("contents", ContentSchema)

module.exports = Content;