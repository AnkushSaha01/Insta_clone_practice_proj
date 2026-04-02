import axios from "axios"

export async function searchUser({ query }) {

    const response = await axios.get("http://localhost:3000/api/users/search?q=" + query, {
        withCredentials: true
    })
    return response.data

}

export async function getCurrentUser() {
    const response = await axios.get("http://localhost:3000/api/auth/me", {
        withCredentials: true
    })
    console.log(response.data)
    return response.data
}