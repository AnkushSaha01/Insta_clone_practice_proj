import axios from "axios";

export const getProfileData = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/users/profile", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}

export const getFollowers = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/users/followers", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}


export const getFollowingUsers = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/users/following", {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        throw error;
    }
}