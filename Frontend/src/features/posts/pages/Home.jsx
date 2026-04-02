import React, { useEffect } from "react";
import PostCard from "../components/PostCard";
import { usePost } from "../hooks/usePosts";
import { useSelector } from "react-redux";
import Stories from "./Stories";

const Home = () => {
  const { handleGetPosts } = usePost();

  const posts = useSelector((state) => state.posts.posts);

  useEffect(() => {
    handleGetPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#f9f9f9] py-8 px-4 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Top Header / Branding */}
        <header className="flex justify-between items-center mb-10 px-2 sticky top-0 z-10 bg-[#f9f9f9]/90 backdrop-blur-md py-4">
          <h1 className="text-3xl font-bold text-[#2d3435] tracking-tight">
            The Curator
          </h1>
          <div className="flex gap-4 text-[#2d3435]">
            <button className="hover:opacity-70 transition-opacity">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </button>
          </div>
        </header>
        {/* Stories */}
        <Stories />

        {/* Feed */}
        <main>
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Home;
