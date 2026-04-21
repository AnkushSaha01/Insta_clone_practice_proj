import axios from "axios";



export const getFollowReq = async () => {
    const response = await axios.get("/api/users/followReqs", {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};

export const acceptFollowReq = async ({ reqId }) => {
    const response = await axios.patch(`/api/users/followReq/${reqId}`, {}, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};

export const rejectFollowReq = async ({ reqId }) => {
    const response = await axios.delete(`/api/users/followReq/${reqId}`, {
      withCredentials: true,
    });
    console.log(response.data);
    return response.data;
};