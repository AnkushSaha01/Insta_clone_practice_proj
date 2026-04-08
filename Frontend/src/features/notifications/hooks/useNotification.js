import { getFollowReq } from "../service/notification.api";
import { useDispatch } from "react-redux";
import { setFollowReqs } from "../notification.slice";

export const useNotification = () => {
    const dispatch = useDispatch()
    async function handleGetFollowReq() {
        const data = await getFollowReq();
        dispatch(setFollowReqs(data.follow));
    }
    return {
        handleGetFollowReq
    }
}