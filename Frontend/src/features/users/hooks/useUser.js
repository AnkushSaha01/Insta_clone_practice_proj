import { searchUser, getCurrentUser, followUser } from "../service/user.api.js";
import { useDispatch } from "react-redux";
import { appendRequest } from "../user.slice.js";

export const useUser = () => {
    const dispatch = useDispatch()

    async function handleSearchUser({ query }) {
        const data = await searchUser({ query })
        return data.users
    }
    async function handleGetCurrentUser() {
        const data = await getCurrentUser()
        return data.user
    }   
     async function handleFollowUser({ userId }) {
        const data = await followUser({ userId })
        dispatch(appendRequest(userId))
        return data.follow
    }


    return {
        handleSearchUser,
        handleGetCurrentUser,
        handleFollowUser
    }

}