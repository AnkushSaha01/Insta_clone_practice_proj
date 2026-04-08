import axios from "axios";



export const getFollowReq = async () => {
    const response = await axios.get("http://localhost:3000/api/users/followReqs", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};

export const acceptFollowReq = async ({ reqId }) => {
    const response = await axios.patch(`http://localhost:3000/api/users/followReq/${reqId}`, {}, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};