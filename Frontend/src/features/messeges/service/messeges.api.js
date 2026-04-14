import axios from "axios";

const getChats = async () => {
    const response = await axios.get("http://localhost:3000/api/users/messages", {
        withCredentials: true,
    });
    // console.log("response", response.data.messages);
    return response.data.messages;
}

export default getChats;