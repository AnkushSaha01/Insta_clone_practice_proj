import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Grid,
  Bookmark,
  UserSquare,
  Settings,
  Link as LinkIcon,
  Plus,
} from "lucide-react";
import useProfile from "../hooks/useProfile";
import FollowersPopup from "../components/FollowersPopup";
import FollowingPopup from "../components/FollowingPopup";

const Profile = () => {
  // const user = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.profile.profile);
  const [activeTab, setActiveTab] = useState("posts");
  const [showFollowers, setShowFollowers] = useState(false);
  const [showFollowing, setShowFollowing] = useState(false);
  const { getProfile } = useProfile();
  useEffect(() => {
    async function fetchProfile() {
      const profileData = await getProfile();
      console.log(profileData);
    }
    fetchProfile();
  }, []);

  // Dummy data for grid

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pt-10 pb-20 md:pb-10 animate-in fade-in duration-500">
      {/* Header section */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:gap-12 gap-6 mb-10">
        {/* Profile Picture */}
        <div className="flex-shrink-0 mx-auto md:mx-0">
          <div className="w-32 h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 rounded-full overflow-hidden border-2 border-gray-200 p-1">
            <img
              src={
                profile?.profilePicture ||
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
              }
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
        </div>

        {/* User Info & Stats */}
        <div className="flex flex-col flex-1 w-full text-center md:text-left">
          {/* Top row: username & buttons */}
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-normal">
              {profile?.username || "instagram_user"}
            </h2>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-1.5 rounded-lg text-sm transition-colors">
                Edit profile
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold px-4 py-1.5 rounded-lg text-sm transition-colors">
                View archive
              </button>
              <button className="p-1.5 ml-1 md:ml-0 hover:text-gray-600 transition-colors">
                <Settings size={24} strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Stats: Posts, Followers, Following */}
          <div className="flex justify-center md:justify-start gap-8 mb-6 border-y md:border-none py-3 md:py-0">
            <div className="flex flex-col md:flex-row items-center md:gap-1 text-sm md:text-base">
              <span className="font-semibold">{profile?.posts?.length}</span>{" "}
              <span className="text-gray-600 md:text-gray-900">posts</span>
            </div>
            <div 
              className="flex flex-col md:flex-row items-center md:gap-1 text-sm md:text-base cursor-pointer hover:opacity-75 transition-opacity"
              onClick={() => setShowFollowers(true)}
            >
              <span className="font-semibold">{profile?.followers?.length}</span>{" "}
              <span className="text-gray-600 md:text-gray-900">followers</span>
            </div>
            <div className="flex flex-col md:flex-row items-center md:gap-1 text-sm md:text-base cursor-pointer"
            onClick={() => setShowFollowing(true)}>
              <span className="font-semibold">{profile?.following?.length}</span>{" "}
              <span className="text-gray-600 md:text-gray-900">following</span>
            </div>
          </div>

          {/* Bio */}
          <div className="text-sm">
            <h3 className="font-semibold">
              {profile?.fullname || "Aesthetic Creator"}
            </h3>
            <p className="text-gray-800 whitespace-pre-wrap mt-1">
              {profile?.bio ||
                "Minimalist designer & photographer 📷\nExploring the world one pixel at a time.\nCollaborations: hey@example.com"}
            </p>
            <a
              href="#"
              className="text-[#00376b] hover:underline flex items-center justify-center md:justify-start gap-1 font-semibold mt-1"
            >
              <LinkIcon size={14} />
              <span>portfolio.link</span>
            </a>
          </div>
        </div>
      </div>



      {/* Navigation Tabs */}
      <div className="border-t border-gray-200">
        <div className="flex justify-center gap-12 text-[13px] font-semibold tracking-widest uppercase text-gray-500">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex items-center gap-2 py-4 border-t-2 transition-colors -mt-[1px] ${activeTab === "posts" ? "border-gray-900 text-gray-900" : "border-transparent hover:text-gray-900"}`}
          >
            <Grid size={13} strokeWidth={2} />
            <span className="hidden md:inline">Posts</span>
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex items-center gap-2 py-4 border-t-2 transition-colors -mt-[1px] ${activeTab === "saved" ? "border-gray-900 text-gray-900" : "border-transparent hover:text-gray-900"}`}
          >
            <Bookmark size={13} strokeWidth={2} />
            <span className="hidden md:inline">Saved</span>
          </button>
          <button
            onClick={() => setActiveTab("tagged")}
            className={`flex items-center gap-2 py-4 border-t-2 transition-colors -mt-[1px] ${activeTab === "tagged" ? "border-gray-900 text-gray-900" : "border-transparent hover:text-gray-900"}`}
          >
            <UserSquare size={13} strokeWidth={2} />
            <span className="hidden md:inline">Tagged</span>
          </button>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-1 md:gap-4 mt-2">
        {profile?.posts?.map((post) => (
          <div
            key={post._id}
            className="aspect-square bg-gray-100 overflow-hidden relative group cursor-pointer"
          >
            <img
              src={post.media[0].url}
              alt={`Post ${post._id}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-4 text-white p-4">
              <div className="flex justify-center gap-6 w-full">
                <div className="flex items-center gap-2 font-bold">
                  <svg
                    aria-label="Like"
                    color="currentColor"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 0 1 4.708-5.218 4.21 4.21 0 0 1 3.675 1.941c.84 1.175.98 1.543 1.117 1.543s.277-.368 1.117-1.543a4.21 4.21 0 0 1 3.675-1.941Z"
                      fillRule="nonzero"
                    ></path>
                  </svg>
                  <span className="drop-shadow-md">
                    {Math.floor(Math.random() * 1000)}
                  </span>
                </div>
                <div className="flex items-center gap-2 font-bold">
                  <svg
                    aria-label="Comment"
                    color="currentColor"
                    fill="currentColor"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <path
                      d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                  <span className="drop-shadow-md">
                    {Math.floor(Math.random() * 100)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Followers Popup */}
      <FollowersPopup 
        isOpen={showFollowers} 
        onClose={() => setShowFollowers(false)} 
        // followers={profile?.followers || []} 
      />
      {/* Following Popup */}
      <FollowingPopup 
        isOpen={showFollowing} 
        onClose={() => setShowFollowing(false)} 
        // following={profile?.following || []} 
      />
    </div>
  );
};

export default Profile;
