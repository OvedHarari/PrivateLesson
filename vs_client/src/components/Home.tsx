import { FunctionComponent, useContext } from "react";
import { SiteTheme } from "../App";
import HomeCarousel from "./HomeCarousel";
import WhyPrivateLessons from "./WhyPrivateLessons";
import StudyTopics from "./StudyTopics";
import Teachers from "./Teachers";


interface HomeProps {
    studyTopics: any
    setTeachers: Function,
    teachers: any,

}

const Home: FunctionComponent<HomeProps> = ({ studyTopics, setTeachers, teachers }) => {
    let theme = useContext(SiteTheme);
    return (
        <div className={` ${theme}`}>
            <HomeCarousel />
            <WhyPrivateLessons />
            <StudyTopics studyTopics={studyTopics} />
            <Teachers teachers={teachers} setTeachers={setTeachers} />

        </div>);
}

export default Home;