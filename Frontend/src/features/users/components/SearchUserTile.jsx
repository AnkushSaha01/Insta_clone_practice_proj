import React from "react";
import { useUser } from "../hooks/useUser";
import { useSelector } from "react-redux";

const SearchUserTile = ({ results, currentUser }) => {
  const { handleFollowUser } = useUser();
  const requested = useSelector((state) => state.user.requested);

  const handleClick = async (userId) => {
    await handleFollowUser({ userId });
  };
  return (
    <div className="w-full">
      {results.map((user) => {
        return (
          <div  className="w-full animate-fade-in">
            <div className="flex items-center justify-between p-6 bg-[#ffffff] rounded-xl hover:shadow-[0px_12px_40px_rgba(0,0,0,0.04)] transition-all duration-300">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full overflow-hidden bg-[#e8e8e8] border-2 border-[#ffffff]">
                  <img
                    alt="Minimalist portrait"
                    className="w-full h-full object-cover"
                    src={user.profilePicture}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[#000000] tracking-tight">
                    {user.username}
                  </span>
                  <span className="text-[#474747] text-sm font-normal">
                    {user.fullname}
                  </span>
                </div>
              </div>
              {user.username !== currentUser.username && (
                <button
                  disabled={user.followStatus}
                  onClick={() => handleClick(user._id)}
                  className="bg-[#000000] text-[#e2e2e2] px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all"
                >
                  {user.followStatus === null
                    ? "Follow"
                    : user.followStatus === "requested"
                      ? "Requested"
                      : "Following"}
                </button>
              )}
            </div>
          </div>
        );
      })}

      {results.length === 0 && (
        <div className="text-center text-[#474747] mt-10">No results found</div>
      )}
    </div>
  );
};

export default SearchUserTile;
