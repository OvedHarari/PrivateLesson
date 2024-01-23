import { FunctionComponent } from "react";
import StudyTopic from "../interfaces/StudyTopic";
import { useNavigate } from "react-router-dom";

interface StudyTopicsProps {
    studyTopics: any

}

const StudyTopics: FunctionComponent<StudyTopicsProps> = ({ studyTopics }) => {
    const navigate = useNavigate()

    return (<div className="container-topics mt-5 mb-5">
        <div>
            <h2> Topics with tutors that are ready to help you</h2>
        </div >
        {studyTopics.length ? (
            <div className="container">
                <div className="row justify-content-center ">
                    {studyTopics.map((topic: StudyTopic) => (
                        <div
                            key={topic._id}
                            className="card topics-card rounded-5 col-md-4 mx-3 mt-4 shadow"
                            style={{ width: "18rem" }}
                            onClick={() => navigate(`/topic/${topic._id}`)} >
                            <div className="card-body">
                                <h4 className="card-subtitle mb-2 text-muted">
                                    {topic.name}
                                </h4>

                            </div>
                            <div className="cardImgDiv ">
                                <img
                                    src={topic.image}
                                    className="card-img-top cardImg rounded-circle"
                                    width="176" height="176"
                                    alt={topic.name}
                                />
                                <div className="row mt-3 mb-3">
                                    <h5 className="card-title text-start col">{topic.numberOfTeachers} teachers</h5>
                                    <h5 className="card-title text-end col"> {">"}</h5>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <p>No Topics to show</p>
        )}
    </div>);
}

export default StudyTopics;