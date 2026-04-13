import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useSelector } from "react-redux";
import useProfile from "../hooks/useProfile";

const FollowersPopup = ({ isOpen, onClose }) => {
  const followers = useSelector((state) => state.profile.followers);
  const {getFollowers} = useProfile();
  useEffect(() => {
    if (isOpen) {
      getFollowers();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-xl w-full max-w-sm overflow-hidden flex flex-col shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="relative flex items-center justify-center px-4 py-3 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">Followers</h2>
          <button
            onClick={onClose}
            className="absolute right-4 p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 rounded-full transition-colors"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Followers List */}
        <div className="max-h-[60vh] overflow-y-auto w-full custom-scrollbar">
          {followers && followers.length > 0 ? (
            <div className="p-2 w-full">

              
              {followers.map((followerItem, index) => {
                // Handle cases where the backend sends raw follow objects (unpopulated) 
                // vs fully populated follower objects.
                const userObj = followerItem?.follower || followerItem;
                const profilePic = userObj?.profilePicture || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80";
                const username = userObj?.username || `follower_${index}`;
                const fullname = userObj?.fullname || "";

                return (
                  <div
                    key={followerItem._id || index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-200">
                      <img
                        src={profilePic}
                        alt={username}
                        className="w-full h-full object-cover"
                      />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm text-gray-900 leading-tight">
                          {username}
                        </span>
                        {fullname && (
                          <span className="text-gray-500 text-sm leading-tight">
                            {fullname}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold text-xs px-4 py-1.5 rounded-lg transition-colors opacity-100 md:opacity-0 md:group-hover:opacity-100">
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
              <div className="w-16 h-16 rounded-full border-2 border-gray-900 flex items-center justify-center mb-4">
                <svg
                  aria-label="Add Friend"
                  color="#111827"
                  fill="#111827"
                  height="32"
                  role="img"
                  viewBox="0 0 24 24"
                  width="32"
                >
                  <path d="M12.003 1.131a6.388 6.388 0 1 0 0 12.776 6.388 6.388 0 0 0 0-12.776Zm0 10.776a4.388 4.388 0 1 1 0-8.776 4.388 4.388 0 0 1 0 8.776Zm10.155 8.948A2.5 2.5 0 0 0 20 18.5a6.508 6.508 0 0 0-6.504-6.5h-2.992A6.508 6.508 0 0 0 4 18.5a2.5 2.5 0 0 0-2.158 2.355 1 1 0 0 0 1.99.195A.5.5 0 0 1 4.264 20h15.472a.5.5 0 0 1 .432 1.05 1 1 0 0 0 .99.196Z"></path>
                </svg>
              </div>
              <span className="text-lg font-bold text-gray-900 mb-1">
                Followers
              </span>
              <span className="text-sm text-gray-500">
                You'll see all people who follow you here.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FollowersPopup;
