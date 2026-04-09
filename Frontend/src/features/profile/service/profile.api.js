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