import { getFollowReq, acceptFollowReq } from "../service/notification.api";
import { useDispatch } from "react-redux";
import { setFollowReqs } from "../notification.slice";

export const useNotification = () => {
    const dispatch = useDispatch()
    async function handleGetFollowReq() {
        const data = await getFollowReq();
        dispatch(setFollowReqs(data.follow));
    }
    async function handleAcceptFollowReq({ reqId }) {
        await acceptFollowReq({ reqId });
        handleGetFollowReq();
    }
    return {
        handleGetFollowReq,
        handleAcceptFollowReq
    }
}