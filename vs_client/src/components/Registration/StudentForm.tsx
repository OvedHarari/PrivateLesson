import { useFormik } from "formik";
import { FunctionComponent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from 'yup'
import { deleteUserById, getGooglSignOut, getUserById, updateUser } from "../../services/usersService";
import { successMsg } from "../../services/feedbacksService";
import User from "../../interfaces/User";

interface StusentFormProps {
    setUserProfile: Function;
    userProfile: any;
    userInfo: any;
    setUserInfo: Function;
}

const StusentForm: FunctionComponent<StusentFormProps> = ({ setUserProfile, userProfile, userInfo, setUserInfo }) => {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            schoolGrade: "",
            name: { firstName: userProfile.name.firstName, middleName: userProfile.name.middleName, lastName: userProfile.name.lastName }, phone: userProfile.phone, email: userProfile.email,
            gender: userProfile.gender, image: { url: userProfile.image.url, alt: userProfile.image.alt }, address: { country: userProfile.address.country, state: userProfile.address.state, city: userProfile.address.city, street: userProfile.address.street, houseNumber: userProfile.address.houseNumber, zipcode: userProfile.address.zipcode }, role: userProfile.role, isActive: userProfile.isActive
        },
        enableReinitialize: true,
        validationSchema: yup.object({
            schoolGrade: yup.string().required().min(1),
        }),
        onSubmit: async (values: User) => {
            updateUser(values, userProfile._id).then((res) => {
                navigate("/");
                successMsg(`${values.email} was registered and logged in`);
            }).catch((err) => console.log(err));
        },
    });

    const Logout = async () => {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
        setUserInfo({ email: false, role: false });
        navigate("/");
        getGooglSignOut().then((res) => { }).catch((err) => console.log(err));
        successMsg("See you soon 😉");
    };

    const handleCancel = () => {
        deleteUserById(userProfile._id);
        Logout();
    };
    useEffect(() => {

        if (userInfo.userId) {
            getUserById(userInfo.userId)
                .then((res) => { setUserProfile(res.data); })
                .catch((err) => console.log(err));
        }
    }, [setUserProfile, userInfo.userId]);
    return (
        <div className="container">
            <form className="form-floating register mb-3 mt-3" onSubmit={formik.handleSubmit}>
                <h5 className="fw-bold mt-5 mb-5">Hello {userProfile.name.firstName}, <br /> please complete your Student registration...</h5>
                <div className="row g-2 border rounded-4 border-secondary mt-2 mb-3">

                    <div className="form-floating col-6 mb-3">
                        <select className="form-select border-secondary mt-2" aria-label="schoolGrade" id="floatingSchoolGrade" placeholder="schoolGrade"
                            name="schoolGrade"
                            onChange={formik.handleChange}
                            value={formik.values.schoolGrade}
                            onBlur={formik.handleBlur} >
                            <option value=""></option>
                            <option className="elementry" value="1stGrade">Elementry School, 1st Grade</option>
                            <option className="elementry" value="2ndtGrade">Elementry School, 2nd Grade</option>
                            <option className="elementry" value="3rdGrade">Elementry School, 3rd Grade</option>
                            <option className="elementry" value="4thGrade">Elementry School, 4th Grade</option>
                            <option className="elementry" value="5thGrade">Elementry School, 5th Grade</option>
                            <option className="elementry" value="6thGrade">Elementry School, 6th Grade</option>
                            <option className="middle" value="7thGrade">Middle School, 7th Grade</option>
                            <option className="middle" value="8thGrade">Middle School, 8th Grade</option>
                            <option className="middle" value="9thGrade">Middle School, 9th Grade</option>
                            <option className="high" value="10thGrade">High School, 10th Grade</option>
                            <option className="high" value="11thGrade">High School, 11th Grade</option>
                            <option className="high" value="12thGrade">High School, 12th Grade</option>
                        </select>
                        <label className="lable mt-2" htmlFor="floatingSchoolGrade">schoolGrade *</label>
                        {formik.touched.schoolGrade && formik.errors.schoolGrade && (<p className="text-danger">{formik.errors.schoolGrade}</p>)}
                    </div>
                    <div className="form-floating col-6 mb-3 mt-3 rounded-4">
                        <img className="form-floating col-12 rounded-4" src="images/schoolGrade.png" alt="SchoolGrade chart" />
                    </div>
                </div>
                <button className="btn btn-secondary w-100 mt-3" type="submit" disabled={!formik.isValid || !formik.dirty}>Complete Registeration</button>
            </form >
            <div className="row ms-1">
                <button type="button" className="btn btn-outline-danger col-1 "
                    onClick={() => handleCancel()}>Cancel Registration</button>
            </div>
        </div >);
}

export default StusentForm;