import { searchUser, getCurrentUser } from "../service/user.api";

export const useUser = () => {

    async function handleSearchUser({ query }) {
        const data = await searchUser({ query })
        return data.users
    }
    async function handleGetCurrentUser() {
        const data = await getCurrentUser()
        return data.user
    }


    return {
        handleSearchUser,
        handleGetCurrentUser
    }

}