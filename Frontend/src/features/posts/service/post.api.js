import axios from "axios"

export const getPosts = async () => {
    const response = await axios.get("http://localhost:3000/api/posts", {
        withCredentials: true
    })

    return response.data
}
export async function createPost({ files, caption }) {

    const formData = new FormData()
    formData.append("caption", caption)
    Array.from(files).forEach((file) => {
        formData.append("media", file)
    })

    const response = await axios.post("http://localhost:3000/api/posts/", formData, { withCredentials: true })

    return response.data

} 

export async function getStories() {
    const response = await axios.get("http://localhost:3000/api/stories/get-stories", {
        withCredentials: true
    })

    return response.data
}