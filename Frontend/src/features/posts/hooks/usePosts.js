import { useDispatch } from "react-redux";
import { setPosts } from "../post.slice";
import { getPosts, createPost } from "../service/post.api";


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

    return {
        handleGetPosts,
        handleCreatePost
    }

}