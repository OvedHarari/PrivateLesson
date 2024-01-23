const mongoose = require("mongoose");

const StudyTopicSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    description: {
        type: String,
        required: true,
        minlength: 2
    },
    image: {
        type: String,
        required: false,
    },
    numberOfTeachers: {
        type: Number,
        required: false
    }


})

const StudyTopic = mongoose.model("StudyTopics", StudyTopicSchema);
module.exports = StudyTopic;