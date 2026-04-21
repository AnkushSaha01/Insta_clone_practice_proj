import axios from "axios"

export async function searchUser({ query }) {

    const response = await axios.get("/api/users/search?q=" + query, {
        withCredentials: true
    })
    return response.data

}

export async function followUser({ userId }) {

    const response = await axios.post("/api/users/follow/" + userId, {}, {
        withCredentials: true
    })

    return response.data

}

export async function getCurrentUser() {
    const response = await axios.get("/api/auth/me", {
        withCredentials: true
    })
    // console.log(response.data)
    return response.data
}