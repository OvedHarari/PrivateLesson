import { FunctionComponent } from "react";
import { updateUser } from "../services/usersService";
import User from "../interfaces/User";
import { useFormik } from "formik";
import * as yup from "yup";
import { successMsg } from "../services/feedbacksService";
import { Accordion, FloatingLabel, Form } from "react-bootstrap";

interface UserProfileProps { userInfo: any; onHide: Function; setUserProfile: Function; userProfile: any; editForm: boolean; setEditForm: Function; render: Function; passwordShown: boolean; togglePassword: Function; }
const UserProfile: FunctionComponent<UserProfileProps> = ({ onHide, userProfile, editForm, setEditForm, render, passwordShown, togglePassword }) => {
    let formik = useFormik({
        initialValues: {
            name: { firstName: userProfile.name.firstName, middleName: userProfile.name.middleName, lastName: userProfile.name.lastName }, phone: { mobile: userProfile.phone.mobile, landline: userProfile.phone.landline }, email: userProfile.email,
            gender: userProfile.gender, image: { url: userProfile.image.url }, address: { country: userProfile.address.country, state: userProfile.address.state, city: userProfile.address.city, street: userProfile.address.street, houseNumber: userProfile.address.houseNumber, zipcode: userProfile.address.zipcode }, role: userProfile.role, isActive: userProfile.isActive, schoolGrade: userProfile.schoolGrade, hourlyPay: userProfile.hourlyPay, educationType: userProfile.educationType, educationText: userProfile.educationText, teacherDescription: userProfile.teacherDescription, teacherComments: userProfile.teacherComments
        },
        validationSchema: yup.object().shape({
            name: yup.object({ firstName: yup.string().required().min(2), middleName: yup.string().min(2), lastName: yup.string().required().min(2) }),
            phone: yup.object({ mobile: yup.string().required().min(8), landline: yup.string().min(8) }), email: yup.string().required().email(), gender: yup.string().required(), image: yup.object({ url: yup.string().min(2) }), address: yup.object({ country: yup.string().min(2), state: yup.string().min(2), city: yup.string().min(2), street: yup.string().min(2), houseNumber: yup.string().min(2), zipcode: yup.string().min(2) }), role: yup.string().min(2), schoolGrade: yup.string().when("studentValidation", (studentValidation, schema) => {
                if (userProfile.role === 'student')
                    return schema
                        .required().min(1);
                return schema
            }),
            hourlyPay: yup.number().when("teacherValidation", (teacherValidation, schema) => {
                if (userProfile.role === 'teacher')
                    return schema
                        .required().min(1);
                return schema
            }),
            educationType: yup.string().when("teacherValidation", (teacherValidation, schema) => {
                if (userProfile.role === 'teacher')
                    return schema
                        .required().min(2);
                return schema
            }), teacherComments: yup.string().min(2), educationText: yup.string().when("teacherValidation", (teacherValidation, schema) => {
                if (userProfile.role === 'teacher')
                    return schema
                        .required("Education Details are required");
                return schema
            }),
            numberRating: yup.number().min(0)
        }),
        enableReinitialize: true,
        onSubmit(values: User) {
            updateUser(values, userProfile._id)
                .then((res) => {
                    setEditForm(true)
                    onHide();
                    render();
                    successMsg(`Changes where saved for user ${values.email}`);
                })
                .catch((err) => console.log(err));
        },
    });
    return <>
        <div className="row g-0">
            <div className="col-md-4">
            </div>
            <div className="container">
                <form className="form-floating  mt-3" onSubmit={formik.handleSubmit}>
                    <h6 className=" mt-4 text-start">General</h6>
                    <div className="row g-2 border rounded-4 border-secondary mt-1">
                        <div className="form-floating col-6 mb-3 mt-3">
                            <input type="text" className="form-control border-secondary " id="floatingFirstName" placeholder="First Name"
                                name="name.firstName"
                                onChange={formik.handleChange}
                                value={formik.values.name.firstName}
                                onBlur={formik.handleBlur} disabled={editForm}  ></input>
                            <label htmlFor="floatingFirstName">First Name *</label>
                            {formik.touched.name?.firstName && formik.errors.name?.firstName && (
                                <p className="text-danger">{formik.errors.name.firstName}</p>)}
                        </div>
                        <div className="form-floating col-6 mb-3 mt-3">
                            <input type="text" className="form-control border-secondary" id="floatingMiddleName" placeholder="Middle Name"
                                name="name.middleName"
                                onChange={formik.handleChange}
                                value={formik.values.name.middleName}
                                onBlur={formik.handleBlur} disabled={editForm} ></input>
                            <label htmlFor="floatingmiddleName">Middle Name</label>
                            {formik.touched.name?.middleName && formik.errors.name?.middleName && (
                                <p className="text-danger">{formik.errors.name.middleName}</p>)}
                        </div>
                        <div className="form-floating col-6 mb-3">
                            <input type="text" className="form-control border-secondary" id="floatingLastName" placeholder="Last Name"
                                name="name.lastName"
                                onChange={formik.handleChange}
                                value={formik.values.name.lastName}
                                onBlur={formik.handleBlur} disabled={editForm} ></input>
                            <label htmlFor="floatingLastName">Last Name *</label>
                            {formik.touched.name?.lastName && formik.errors.name?.lastName && (
                                <p className="text-danger">{formik.errors.name.lastName}</p>)}
                        </div>
                        <div className="form-floating col-6 mb-3">
                            <input type="text" className="form-control border-secondary" id="floatingMobile" placeholder="Mobile Number"
                                name="phone.mobile"
                                onChange={formik.handleChange}
                                value={formik.values.phone.mobile}
                                onBlur={formik.handleBlur} disabled={editForm} ></input>
                            <label htmlFor="floatingPhone">Mobile Number *</label>
                            {formik.touched.phone?.mobile && formik.errors.phone?.mobile && (
                                <p className="text-danger">{formik.errors.phone.mobile}</p>)}
                        </div>
                        <div className="form-floating col-6 mb-3">
                            <input type="text" className="form-control border-secondary" id="floatingLandline" placeholder="Landline Number"
                                name="phone.landline"
                                onChange={formik.handleChange}
                                value={formik.values.phone.landline}
                                onBlur={formik.handleBlur} disabled={editForm} ></input>
                            <label htmlFor="floatingPhone">Landline Number</label>
                            {formik.touched.phone?.landline && formik.errors.phone?.landline && (
                                <p className="text-danger">{formik.errors.phone.landline}</p>)}
                        </div>

                        <div className="form-floating col-6 mb-3">
                            <input type="text" className="form-control border-secondary" id="floatingEmail" placeholder="name@example.com"
                                name="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                onBlur={formik.handleBlur} disabled={editForm} ></input>
                            <label htmlFor="floatingEmail">Email address *</label>
                            {formik.touched.email && formik.errors.email && (
                                <p className="text-danger">{formik.errors.email}</p>)}
                        </div>
                        {/* <div className="form-floating col-6 mb-3">
                            <input type={passwordShown ? "text" : "password"} className="form-control border-secondary" id="floatingPassword" placeholder="Password"
                                name="password"
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                onBlur={formik.handleBlur} disabled={editForm}></input>
                            <div className="passIcon">
                                {passwordShown ? <i className="fa-solid fa-eye-slash passIcon" onClick={() => togglePassword(!passwordShown)}></i> : <i className="fa-solid fa-eye passIcon" onClick={() => togglePassword(!passwordShown)}></i>}
                            </div>
                            <label htmlFor="floatingPassword">Password *</label>
                            {formik.touched.password && formik.errors.password && (
                                <p className="text-danger">{formik.errors.password}</p>)}
                        </div> */}
                    </div>
                    <h6 className="mt-4 text-start">Gander / Image</h6>
                    <div className="row g-2 border rounded-4 border-secondary mt-1">
                        <div className="form-floating col-6 mb-3 mt-3 ">
                            <select className="form-select border-secondary" aria-label="Grnder" id="floatingGender" placeholder="Gender"
                                name="gender"
                                onChange={formik.handleChange}
                                value={formik.values.gender}
                                onBlur={formik.handleBlur} disabled={editForm} >
                                <option value=""></option>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="other">Other</option>
                            </select>
                            <label className="lable" htmlFor="floatingGender">Gender *</label>
                            {formik.touched.gender && formik.errors.gender && (
                                <p className="text-danger">{formik.errors.gender}</p>)}
                        </div>
                        <div className="form-floating col-6 mb-3 mt-3">
                            <input
                                type="text" className="form-control border-secondary" id="floatingUserImgURL" placeholder="User Image URL"
                                name="image.url"
                                onChange={formik.handleChange}
                                value={formik.values.image.url}
                                onBlur={formik.handleBlur} disabled={editForm} ></input>
                            <label htmlFor="floatingUserImgURL">User Image URL</label>
                            {formik.touched.image?.url && formik.errors.image?.url && (<p className="text-danger">{formik.errors.image.url}</p>)}
                        </div>
                    </div>
                    <Accordion className="mt-4 g-2  accordion" defaultActiveKey="0">
                        <Accordion.Item className="accordion row g-2 border rounded-4 border-secondary mt-1 mb-3" eventKey="1">
                            <Accordion.Header className="rounded-4 accordion mb-1 mt-3 align-content-center"><h6>Address</h6></Accordion.Header>
                            <Accordion.Body>
                                <div className="row g-2  mt-1" >
                                    <div className="form-floating col-6 mb-3 mt-3">
                                        <input type="text" className="form-control border-secondary" id="floatingState" placeholder="State"
                                            name="address.state"
                                            onChange={formik.handleChange}
                                            value={formik.values.address.state}
                                            onBlur={formik.handleBlur} disabled={editForm} ></input>
                                        <label htmlFor="floatingState">State</label>
                                        {formik.touched.address?.state && formik.errors.address?.state && (<p className="text-danger">{formik.errors.address.state}</p>)}
                                    </div>
                                    <div className="form-floating col-6 mb-3 mt-3">
                                        <input type="text" className="form-control border-secondary" id="floatingCountry" placeholder="Country"
                                            name="address.country"
                                            onChange={formik.handleChange}
                                            value={formik.values.address.country}
                                            onBlur={formik.handleBlur} disabled={editForm} ></input>
                                        <label htmlFor="floatingCountry">Country</label>
                                        {formik.touched.address?.country && formik.errors.address?.country && (<p className="text-danger">{formik.errors.address.country}</p>)}
                                    </div>
                                    <div className="form-floating col-6 mb-3">
                                        <input type="text" className="form-control border-secondary" id="floatingCity" placeholder="City"
                                            name="address.city"
                                            onChange={formik.handleChange}
                                            value={formik.values.address.city}
                                            onBlur={formik.handleBlur} disabled={editForm} ></input>
                                        <label htmlFor="floatingCity">City</label>
                                        {formik.touched.address?.city && formik.errors.address?.city && (<p className="text-danger">{formik.errors.address.city}</p>)}
                                    </div>
                                    <div className="form-floating col-6 mb-3">
                                        <input type="text" className="form-control border-secondary" id="floatingStreet" placeholder="Street"
                                            name="address.street"
                                            onChange={formik.handleChange}
                                            value={formik.values.address.street}
                                            onBlur={formik.handleBlur} disabled={editForm} ></input>
                                        <label htmlFor="floatingStreet">Street</label>
                                        {formik.touched.address?.street && formik.errors.address?.street && (<p className="text-danger">{formik.errors.address.street}</p>)}
                                    </div>
                                    <div className="form-floating col-6 mb-3">
                                        <input
                                            type="text" className="form-control border-secondary" id="floatingHouseNumber" placeholder="House Number"
                                            name="address.houseNumber"
                                            onChange={formik.handleChange}
                                            value={formik.values.address.houseNumber}
                                            onBlur={formik.handleBlur} disabled={editForm} ></input>
                                        <label htmlFor="floatingHouseNumber">House Number</label>
                                        {formik.touched.address?.houseNumber && formik.errors.address?.houseNumber && (<p className="text-danger">{formik.errors.address.houseNumber}</p>)}
                                    </div>
                                    <div className="form-floating col-6 mb-3">
                                        <input
                                            type="text"
                                            className="form-control border-secondary" id="floatingZipCode" placeholder="Zip code"
                                            name="address.zipcode"
                                            onChange={formik.handleChange}
                                            value={formik.values.address.zipcode}
                                            onBlur={formik.handleBlur} disabled={editForm} ></input>
                                        <label htmlFor="floatingZipCode">Zip Code</label>
                                        {formik.touched.address?.zipcode && formik.errors.address?.zipcode && (<p className="text-danger">{formik.errors.address.zipcode}</p>)}
                                    </div>
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                    <h5 className="mt-4 text-center fw-bold">To continue registration, please select STUDENT or TEACHER</h5>
                    <div className="row g-2 border rounded-4 border-secondary mt-1">
                    </div>
                    {(userProfile.role === 'admin' || userProfile.role === 'student') && <div className="row g-2 border rounded-4 border-secondary mt-2 mb-3">

                        <div className="form-floating col-6 mb-3">
                            <select className="form-select border-secondary mt-2" aria-label="schoolGrade" id="floatingSchoolGrade" placeholder="schoolGrade"
                                name="schoolGrade"
                                onChange={formik.handleChange}
                                value={formik.values.schoolGrade}
                                onBlur={formik.handleBlur} disabled={editForm} >
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
                    }
                    {(userProfile.role === 'admin' || userProfile.role === 'teacher') && <div className="row g-2 border rounded-4 border-secondary mt-1">
                        <div className="form-floating col-6 mb-3 mt-3 ">
                            <select className="form-select border-secondary" aria-label="EducationType" id="floatingEducationType" placeholder="EducationType"
                                name="educationType"
                                onChange={formik.handleChange}
                                value={formik.values.educationType}
                                onBlur={formik.handleBlur} disabled={editForm} >
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
                                    onBlur={formik.handleBlur} disabled={editForm} />
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
                                    onBlur={formik.handleBlur} disabled={editForm} />
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
                                    onBlur={formik.handleBlur} disabled={editForm} />
                            </FloatingLabel>
                            {formik.touched.teacherComments && formik.errors.teacherComments && (
                                <p className="text-danger">{formik.errors.teacherComments}</p>)}
                        </div>
                        <div className="form-floating col-6 mb-3">
                            <input type="number" className="form-control border-secondary" id="floatingHourlyPay" placeholder="Hourly Pay"
                                name="hourlyPay"
                                onChange={formik.handleChange}
                                value={formik.values.hourlyPay}
                                onBlur={formik.handleBlur} disabled={editForm} ></input>
                            <label htmlFor="floatingHourlyPay">Hourly Pay</label>
                            {formik.touched.hourlyPay && formik.errors.hourlyPay && (<p className="text-danger">{formik.errors.hourlyPay}</p>)}
                        </div>
                    </div>}

                    <div className="row mt-1">
                        {/* <div className="form-floating col-6 mb-3 mt-3 ">
                            <button className="btn btn-secondary w-100 mt-3" value={'student'} name="role"
                                onClick={(e) => {
                                    formik.handleChange(e);
                                    setUserRole(e.currentTarget.value)
                                }} type="submit"
                                disabled={!formik.isValid || !formik.dirty} >Registerring as Student</button>
                        </div> */}
                        {/* <div className="form-floating col-6 mb-3 mt-3 ">
                            <button className="btn btn-secondary w-100 mt-3" value={'teacher'} name="role"
                                onClick={(e) => {
                                    formik.handleChange(e);
                                    setUserRole(e.currentTarget.value)
                                }} type="submit"
                                disabled={!formik.isValid || !formik.dirty}>Registering as Teacher</button>
                        </div> */}
                    </div>
                    <button className="btn btn-secondary w-100 mt-3" type="submit" disabled={!formik.isValid || !formik.dirty}>Save Changes</button>
                </form>
                <div className="col-6">
                    <button className="btn btn-danger mt-3" onClick={() => { onHide(); setEditForm(true) }}>Close Without Saving</button>
                </div>
            </div>
        </div>
    </>
};

export default UserProfile;