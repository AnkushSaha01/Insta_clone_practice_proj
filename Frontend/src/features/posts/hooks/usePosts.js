import { useDispatch } from "react-redux";
import { setPosts } from "../post.slice";
import { getPosts, createPost, getStories } from "../service/post.api";
import { setStories } from "../story.slice";



export const usePost = () => {

    const dispatch = useDispatch()

    async function handleGetPosts() {
        const data = await getPosts()
        dispatch(setPosts(data.posts))
    }

    async function handleCreatePost({ files, caption }) {
        const data = await createPost({ files, caption })
        return data
    }

    async function handleGetStories() {
        const data = await getStories()
        dispatch(setStories(data.stories))
        return data
    }

    return {
        handleGetPosts,
        handleCreatePost,
        handleGetStories
    }

}