const express = require('express');
const router = express.Router();
const joi = require('joi');
const auth = require("../middlewares/auth");
const { route } = require('./users');
const studyTopicService = require('../services/studyTopicService');

// create topic schema 
const StudyTopicSchema = joi.object({
    name: joi.string().required().min(2)
});
// convert first letter of a string to uppercase
function capitalizeFirstLetter(str) {

    // converting first letter to uppercase
    const capitalized = str.replace(/^./, str[0].toUpperCase());

    return capitalized;
}

// create new
router.post("/",
    // auth, 
    async (req, res) => {

        try {
            // check if logged in as Admin
            if (req.payload.role != "admin")
                return res.status(400).send("Only Admins to create new Study Topics")

            // joi validation
            const { error } = StudyTopicSchema.validate(req.body);
            if (error) return res.status(400).send(error);

            // check if already exist
            let studyTopic = { name: "" }
            studyTopic.name = await studyTopicService.getStudyTopicByName(capitalizeFirstLetter(req.body.name));
            if (studyTopic.name) return res.status(400).send('This Study Topic is already exist');
            console.log('check if already exist');

            // create&save Study Topic
            studyTopic.name = await capitalizeFirstLetter(req.body.name);
            console.log(studyTopic);
            await studyTopicService.saveStudyTopic(studyTopic);
            console.log('save');
            res.status(200).send(`Study Topic "${studyTopic}" was created successfuly`);
        } catch (error) {
            res.status(400).send(error);
        }
    })

// get all topics
router.get("/", async (req, res) => {
    try {

        // check Topics
        let topics = await studyTopicService.getAllTopics();
        if (!topics) return res.status(400).send("No Study Topics")

        // return response
        res.status(200).send(topics)

    } catch (error) {
        res.status(400).send(error)
    }
})

// get topic by _id
router.get("/:_id", async (req, res) => {
    try {

        // check studyTopic
        let studyTopic = await studyTopicService.getStudyTopicById(req.params._id);
        if (!studyTopic) return res.status(400).send("No sutch Study Topic")

        // return response
        res.status(200).send(studyTopic)

    } catch (error) {
        res.status(400).send(error)
    }
})

// delete Study Topic by params _id 
router.delete("/:_id", auth, async (req, res) => {

    try {
        if (req.payload.role != "admin" && req.payload._id != req.params._id)
            return res.status(400).send("Only Admin or logged in users are alloud to delete Study Topic")

        // check&get Study Topic by req _id
        const studyTopic = await studyTopicService.getStudyTopicById(req.params._id)
        if (!studyTopic) return res.status(400).send("No such Study Topic")
        // delete Topic
        deleteStudyTopic(req.params._id);

        //2. return response
        res.status(200).send(`"${studyTopic}" was deleted suuccessfuly`)

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router;