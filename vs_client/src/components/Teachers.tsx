import { FunctionComponent, useEffect } from "react";
import User from "../interfaces/User";
import { useNavigate } from "react-router-dom";
import { getAllTeachers } from "../services/teachersService";


interface TeachersProps {
    setTeachers: Function,
    teachers: any,
}

const Teachers: FunctionComponent<TeachersProps> = ({ setTeachers, teachers }) => {
    const navigate = useNavigate();
    const defaultTeacherImage = () => {
        if (teachers.picture) {
            return teachers.picture
        } else
            if (teachers.gender) {
                switch (teachers.gender) {
                    case "male":
                        return "images/users_img/user_male.webp";
                    case "female":
                        return "images/users_img/user_female.webp";
                    case "other":
                        return "images/users_img/user_other.jpg";
                    default:
                        break;
                }
            }
        return "images/users_img/user_male.webp";
    };

    useEffect(() => {
        getAllTeachers().then((res) => setTeachers(res.data)).catch((err) => console.log(err))
    }, [setTeachers]);
    return (<>

        {teachers.length ? (
            <div className="container">
                <div className="row justify-content-center">
                    {teachers.map((teacher: User) => (
                        <div
                            key={teacher._id}
                            className="card teacher-card rounded-5 col-md-4 mx-3 mt-4 shadow "
                            style={{ width: "25rem", height: "32rem" }}
                            onClick={() => navigate(`/topic/${teacher._id}`)} >
                            <img
                                src={teacher && teacher.image.url ? (`${teacher.image.url}`) : (defaultTeacherImage())}
                                className="card-img-top cardImg rounded-circle"
                                style={{ width: "150px", height: "150px" }}
                                alt={teacher.image.alt}
                            />
                            <div className="card-body text-start">
                                <h4 className="card-subtitle mb-2 text-muted">
                                    {teacher.name.firstName} {teacher.name.lastName}
                                </h4>

                            </div>
                            <div className="cardImgDiv ">

                                <div className=" mt-3 mb-3 ms-2">
                                    <h4 className="card-title text-start">{teacher.hourlyPay} $ / h</h4>

                                </div>
                                <div className="mb-3">
                                    <button type="button" className="btn btn-lg btn-outline-primary w-75 rounded-5">Book a session</button>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        ) : (
            <p>No Teachers to show</p>
        )}
    </>);
}

export default Teachers;