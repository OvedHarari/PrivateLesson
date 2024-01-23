import { FunctionComponent } from "react";
import { Link } from "react-router-dom";

interface WhyPrivateLessonsProps {

}

const WhyPrivateLessons: FunctionComponent<WhyPrivateLessonsProps> = () => {
    return (<div className="container-why">
        <div className="row ms-2 me-2">
            <div className="col-12 mb-5">
                <h2>Why is it worth working together with Private Lessons?</h2>
                <div>
                    <p>Two heads can think better than one, and teamwork makes better results. Come and find your best schoolmate, and turn that 2 into a 10.</p>
                </div>
            </div>
            <div>
                <div className="row">
                    <div className="col-3">
                        <img alt="Professional_teachers" src="//images.ctfassets.net/b44tt13alpui/1G2yFy7rTmHIZihdg6tjP2/f4a1bf81a4d5994c6b76f886c2efdf1c/ic_daug_mokytoju.svg" height="50" width="50" />
                        <h3>Professional teachers</h3>
                        <div>
                            <p>Our tutors are not only among the best in their subject area, but also fun, friendly and caring.</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <img alt="One-time_fees" src="//images.ctfassets.net/b44tt13alpui/1XGPeGGGC5f1aehkAPRTmz/32699c9c3bb9b1a3e5b36a5c4a80092b/ic_mokejimai.svg" height="50" width="50" />
                        <h3>One-time fees</h3>
                        <div>
                            <p>Use your payment card to pay for each lesson quickly and easily.</p></div></div><div className="col-3"><img alt="Interactive_lessons" src="//images.ctfassets.net/b44tt13alpui/519BClZK8kfqy29DnfRLlu/289f1b661388936a7d322b48067043dd/ic_pagalba.svg" height="50" width="50" />
                        <h3>Interactive lessons</h3>
                        <div>
                            <p>Online lessons are the way of the future, so our learning methods are modern, with a lot of interactive tasks.</p>
                        </div>
                    </div>
                    <div className="col-3">
                        <img alt="Individualised_learning" src="//images.ctfassets.net/b44tt13alpui/6PbDumBNwuTDk4qWNpexnR/c7bba1a62922d9d90fee8e4c712113e8/ic_mokomieji.svg" height="50" width="50" />
                        <h3>Individualised learning</h3>
                        <div>
                            <p>Each learner is unique, so the curriculum is created by taking into account each learner's knowledge, ability and wishes.</p>
                        </div>
                    </div>
                </div>
                <div className="mt-5">
                    <Link to="/en/teachers/"><button className="btn btn-primary btn-lg" >Find a teacher</button></Link>
                </div>
            </div>
        </div>
    </div>);
}

export default WhyPrivateLessons;