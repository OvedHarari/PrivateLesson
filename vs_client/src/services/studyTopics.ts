import axios from "axios";
import StudyTopic from "../interfaces/StudyTopic";

let api: string = `${process.env.REACT_APP_API}/topics`;

export function getTopics() {
    return axios.get(api);
}

export function getTopicById(_id: string) {
    return axios.get(`${api}/${_id}`);
}

export function addNewStudyTopic(newTopic: StudyTopic) {
    return axios.post(api, newTopic, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function updateStudyTopic(updatedTopic: StudyTopic, _id: string) {
    return axios.put(`${api}/${_id}`, updatedTopic, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

export function deleteStudyTopic(_id: string) {
    return axios.delete(`${api}/${_id}`, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
}

// Update topic properity 
export async function updateStudyTopicProps(topicId: string, propName: any, newValue: any) {
    try {
        const propsObject: Record<string, any> = {
            [propName]: newValue
        };
        return axios.patch(`${api}/${topicId}`, propsObject, { headers: { Authorization: JSON.parse(sessionStorage.getItem("token") as string).token } });
    } catch (error) {
        console.error('Error updating user:', error);
        return null;
    }
}