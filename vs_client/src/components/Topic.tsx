import { FunctionComponent, useEffect, useState } from "react";
import { getTopicById } from "../services/studyTopics";
import { useParams } from "react-router-dom";
import StudyTopic from "../interfaces/StudyTopic";
import Teachers from "./Teachers";

interface TopicProps {
    studyTopics: any,
    setTeachers: Function,
    teachers: any,
}
const Topic: FunctionComponent<TopicProps> = ({ studyTopics, setTeachers, teachers }) => {

    let { topicId } = useParams<{ topicId?: string }>() ?? {};
    let [topic, setTopic] = useState<StudyTopic>();

    useEffect(() => {
        if (topicId) {
            getTopicById(topicId)
                .then((res) => {
                    setTopic(res.data);
                })
                .catch((err) => console.log(err));
        }
    }, [topicId]);
    return (
        <>
            <div className="container-topic">
                <div className="caption text-start">

                    <h1>{topic?.name} Lessons</h1>
                    <p>{topic?.description}</p>
                </div>
                <img className="topic-img " src={`../${topic?.image}`} alt={`../${topic?.name}`} />
            </div>
            <Teachers teachers={teachers} setTeachers={setTeachers} />
        </>);
}

export default Topic;