import { FunctionComponent, useEffect } from "react";
import { deleteUserById, getGooglSignOut, getUserById, updateUser } from "../../services/usersService";
import { useFormik } from "formik";
import * as yup from "yup";
import User from "../../interfaces/User";
import { successMsg } from "../../services/feedbacksService";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

interface TeacherFormProps {
    setUserProfile: Function; userProfile: any; userInfo: any; setUserInfo: Function;
}
const TeacherForm: FunctionComponent<TeacherFormProps> = ({ setUserProfile, userProfile, userInfo, setUserInfo }) => {
    let navigate = useNavigate()
    let formik = useFormik({
        initialValues: {
            hourlyPay: (0), educationType: "", educationText: "", teacherDescription: "", teacherComments: "", name: { firstName: userProfile.name.firstName, middleName: userProfile.name.middleName, lastName: userProfile.name.lastName }, phone: userProfile.phone, email: userProfile.email,
            gender: userProfile.gender, image: { url: userProfile.image.url, alt: userProfile.image.alt }, address: { country: userProfile.address.country, state: userProfile.address.state, city: userProfile.address.city, street: userProfile.address.street, houseNumber: userProfile.address.houseNumber, zipcode: userProfile.address.zipcode }, role: userProfile.role, isActive: userProfile.isActive
        },
        enableReinitialize: true,
        validationSchema: yup.object({ hourlyPay: yup.number().required().min(1), educationType: yup.string().required().min(2), teacherComments: yup.string().min(2), educationText: yup.string().required("Education Details are required"), numberRating: yup.number().min(0) }),
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
    const handleCancel = () => { deleteUserById(userProfile._id); Logout(); };
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
                <h5 className="fw-bold">Hello Teacher, please complete the registration...</h5>
                <div className="row g-2 border rounded-4 border-secondary mt-1">
                    <div className="form-floating col-6 mb-3 mt-3 ">
                        <select className="form-select border-secondary" aria-label="EducationType" id="floatingEducationType" placeholder="EducationType"
                            name="educationType"
                            onChange={formik.handleChange}
                            value={formik.values.educationType}
                            onBlur={formik.handleBlur} >
                            <option value=""></option>
                            <option value="formalEducation">Formal Education</option>
                            <option value="nonFormalEducation">Non-formal Education</option>
                            <option value="other">Other</option>
                        </select>
                        <label className="lable" htmlFor="floatingEducationType">EducationType *</label>
                        {formik.touched.educationType && formik.errors.educationType && (
                            <p className="text-danger">{formik.errors.educationType}</p>)}
                    </div>
                    <div className="form-floating col-12 mb-3 mt-3 ">
                        <FloatingLabel controlId="floatingEducationText" label="Education Details" >
                            <Form.Control className="form-control border-secondary" as="textarea" placeholder="Add Education Details" style={{ height: '100px' }}
                                name="educationText"
                                onChange={formik.handleChange}
                                value={formik.values.educationText}
                                onBlur={formik.handleBlur} />
                        </FloatingLabel>
                        {formik.touched.educationText && formik.errors.educationText && (
                            <p className="text-danger">{formik.errors.educationText}</p>)}
                    </div>
                    <div className="form-floating col-12 mb-3 mt-3 ">
                        <FloatingLabel controlId="floatingTeacherDescription" label="Teacher Description - About me" >
                            <Form.Control className="form-control border-secondary" as="textarea" placeholder="Add Teacher Description - About yourself" style={{ height: '100px' }}
                                name="teacherDescription"
                                onChange={formik.handleChange}
                                value={formik.values.teacherDescription}
                                onBlur={formik.handleBlur} />
                        </FloatingLabel>
                        {formik.touched.teacherDescription && formik.errors.teacherDescription && (
                            <p className="text-danger">{formik.errors.teacherDescription}</p>)}
                    </div>
                    <div className="form-floating col-12 mb-3 mt-3 ">
                        <FloatingLabel controlId="floatingTeacherComments" label="Comments\ Notes" >
                            <Form.Control className="form-control border-secondary" as="textarea" placeholder="Add your Teacher Comments" style={{ height: '100px' }}
                                name="teacherComments"
                                onChange={formik.handleChange}
                                value={formik.values.teacherComments}
                                onBlur={formik.handleBlur} />
                        </FloatingLabel>
                        {formik.touched.teacherComments && formik.errors.teacherComments && (
                            <p className="text-danger">{formik.errors.teacherComments}</p>)}
                    </div>
                    <div className="form-floating col-6 mb-3">
                        <input type="number" className="form-control border-secondary" id="floatingHourlyPay" placeholder="Hourly Pay"
                            name="hourlyPay"
                            onChange={formik.handleChange}
                            value={formik.values.hourlyPay}
                            onBlur={formik.handleBlur} ></input>
                        <label htmlFor="floatingHourlyPay">Hourly Pay</label>
                        {formik.touched.hourlyPay && formik.errors.hourlyPay && (<p className="text-danger">{formik.errors.hourlyPay}</p>)}
                    </div>
                </div>
                <button className="btn btn-secondary w-100 mt-3" type="submit" disabled={!formik.isValid || !formik.dirty}>Complete Registeration</button>
            </form >
            <div className="row ms-1">
                <button type="button" className="btn btn-outline-danger col-1 " onClick={() => handleCancel()}>Cancel Registration</button>
            </div>
        </div >);
}
export default TeacherForm;
