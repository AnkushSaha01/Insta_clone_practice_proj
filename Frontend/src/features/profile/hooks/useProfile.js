// import { useQuery } from "@tanstack/react-query";
import { getProfileData } from "../service/profile.api";
import { useDispatch } from "react-redux";
import { setProfile } from "../profile.slice";

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

  return {getProfile}
}

export default useProfile
