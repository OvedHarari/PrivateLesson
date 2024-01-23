const StudyTopic = require('../../models/StudyTopic')

class StudyTopicRepository {
    // get all Topics
    async getAllTopics() {
        return await StudyTopic.find();
    }
    // get user by name
    async getStudyTopicByName(topicName) {
        return await StudyTopic.findOne({ name: topicName });
    }
    // get Topic by _id
    async getStudyTopicById(topicId) {
        return await StudyTopic.findById({ _id: topicId });

    }
    // delete Topic
    async deleteStudyTopicById(topicId) {
        return await StudyTopic.findOneAndDelete({ _id: topicId });
    }
    //save Topic
    async saveTopic(topic) {
        const newStudyTopic = new StudyTopic(topic);
        return await newStudyTopic.save();
    }
}
module.exports = new StudyTopicRepository();