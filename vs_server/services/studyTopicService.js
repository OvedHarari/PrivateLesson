const studyTopicRepository = require('../data/repositories/studyTopicRepository');

class StudyTopicService {

    async getAllTopics() {
        return await studyTopicRepository.getAllTopics();
    }
    async getStudyTopicByName(topicName) {
        return await studyTopicRepository.getStudyTopicByName(topicName);
    }
    async getStudyTopicById(topicId) {
        return await studyTopicRepository.getStudyTopicById(topicId);
    }
    async deleteStudyTopicById(topicId) {
        return await studyTopicRepository.deleteStudyTopicById(topicId);
    }
    async saveStudyTopic(topic) {
        return await studyTopicRepository.saveTopic(topic);
    }


}


module.exports = new StudyTopicService();