import { FunctionComponent, useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { SiteTheme } from "../App";
import { successMsg } from "../services/feedbacksService";
import UserProfileModal from "./UserProfileModal";
import { getGooglSignOut, getUserProfile } from "../services/usersService";

interface NavbarProps {
    darkMode: boolean;
    setDarkMode: Function;
    userInfo: any;
    setUserInfo: Function;
    userProfile: any;
    setUserProfile: Function;
    render: Function;
    passwordShown: boolean;
    togglePassword: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({
    setDarkMode,
    darkMode,
    userInfo,
    setUserInfo,
    userProfile,
    setUserProfile,
    render,
    passwordShown,
    togglePassword
}) => {
    let theme = useContext(SiteTheme);
    let [userProfileModal, setOpenUserProfileModal] = useState<boolean>(false)
    let navigate = useNavigate();
    let updateUserProfile = () => getUserProfile().then((res) => { setUserProfile(res.data); }).catch((err) => console.log(err))

    let Logout = async () => {
        sessionStorage.removeItem("userInfo");
        sessionStorage.removeItem("token");
        setUserInfo({ email: false, role: false });
        navigate("/");
        getGooglSignOut().then((res) => { }).catch((err) => console.log(err));
        successMsg("See you soon 😉");
    };
    const defaultProfileImage = () => {
        if (userInfo.picture) {
            return userInfo.picture
        } else
            if (userProfile.gender) {
                switch (userProfile.gender) {
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

    return (
        <>
            {/* bg-body-tertiary */}
            <div>
                <nav
                    className="navbar navbar-expand-md"
                    data-bs-theme={`${theme}`} >
                    <div className="container-fluid">
                        <NavLink className="navbar-brand fw-bold" to="/">
                            V-School
                        </NavLink>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation" >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <NavLink className="nav-link" aria-current="page" to="/about">
                                        About
                                    </NavLink>
                                </li>
                                {userInfo.email && (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/favorites">
                                                Fav Cards
                                            </NavLink>
                                        </li>
                                        {(userInfo.role === "teacher" || userInfo.role === "admin") && (
                                            <>
                                                <li className="nav-item">
                                                    <NavLink className="nav-link" to="/mycards">
                                                        My Cards
                                                    </NavLink>
                                                </li>
                                                {userInfo.role === "admin" && (
                                                    <li className="nav-item">
                                                        <NavLink className="nav-link" to="/usersmanagement">
                                                            Admin
                                                        </NavLink>
                                                    </li>
                                                )}
                                            </>
                                        )}
                                    </>
                                )}
                            </ul>
                            <form className="d-flex">
                                <div className="mt-2 me-3 ms-3 fs-4" onClick={() => {
                                    setDarkMode(!darkMode);
                                    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
                                }}>
                                    {darkMode ? (<i className="fa-solid fa-moon"></i>) : (<i className="fa-solid fa-sun"></i>)}
                                </div>
                                {userInfo.email && (
                                    <>
                                        <button className="btn btn-outline" onClick={() => { Logout(); }}>
                                            Logout
                                        </button>
                                        <img src={userProfile && userProfile.userImgURL ? (`${userProfile.userImgURL}`) : (defaultProfileImage())}
                                            className="rounded-circle profileImg" width="50"
                                            alt="user profile"
                                            onClick={() => {
                                                setOpenUserProfileModal(true)
                                                updateUserProfile()
                                            }}></img>
                                    </>
                                )}
                                {!userInfo.email && (
                                    <>
                                        <Link to="/register1" className="btn btn-outline mt-1">
                                            Register
                                        </Link>
                                        <Link to="/login" className="btn btn-outline mt-1">
                                            Login
                                        </Link>
                                    </>)}
                            </form>
                        </div>
                    </div>
                </nav >
            </div >

            <UserProfileModal
                show={userProfileModal}
                onHide={() => setOpenUserProfileModal(false)}
                render={render}
                userInfo={userInfo}
                userProfile={userProfile}
                setUserProfile={setUserProfile}
                passwordShown={passwordShown} togglePassword={togglePassword} />
        </>
    );
};

export default Navbar;
