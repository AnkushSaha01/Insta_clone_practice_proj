// import { useQuery } from "@tanstack/react-query";
import { getProfileData, getFollowers as fetchFollowers, getFollowingUsers } from "../service/profile.api";
import { useDispatch } from "react-redux";
import { setProfile, setFollowers, setFollowing } from "../profile.slice";

const useProfile = ()=>{
  const dispatch = useDispatch();
  const getProfile = async()=>{
    try {
      const response = await getProfileData();
      // console.log(response.profileData[0]);
      dispatch(setProfile(response.profileData[0]));
      return response.profileData[0];
    } catch (error) {
      console.log(error);
    }
  }

  const getFollowers = async()=>{
    try {
      const response = await fetchFollowers();
      // console.log(response.profileData[0]);
      dispatch(setFollowers(response.followers));
      return response;
    } catch (error) {
      console.log(error);
    }
  }
  
  const getFollowing = async()=>{
    try {
      const response = await getFollowingUsers();
      // console.log(response.profileData[0]);
      dispatch(setFollowing(response.following));
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  return {getProfile, getFollowers, getFollowing}
}

export default useProfile
