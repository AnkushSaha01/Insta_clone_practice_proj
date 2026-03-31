import React, { useState } from 'react';

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <article className="bg-[#ffffff] rounded-2xl mb-12 shadow-[0_8px_32px_rgba(45,52,53,0.04)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-linear-to-tr from-[#5e5e5e] to-[#c10023] p-[2px]">
            <img 
              src={post.author.profilePic || "https://i.pravatar.cc/150"} 
              alt={post.author.username} 
              className="w-full h-full object-cover rounded-full border-2 border-white"
            />
          </div>
          <div>
            <h2 className="font-bold text-[#2d3435] text-lg tracking-tight">{post.author.username}</h2>
            {post.location && <p className="text-[#5a6061] text-sm">{post.location}</p>}
          </div>
        </div>
        <button className="text-[#2d3435] hover:opacity-70 transition-opacity p-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
        </button>
      </div>

      {/* Media */}
      <div className="w-full bg-[#f2f4f4] aspect-square relative">
        {post.media && post.media[0] && (
          post.media[0].media_type === 'video' ? (
            <div className="w-full h-full relative group cursor-pointer">
              <video 
                src={post.media[0].url} 
                className="w-full h-full object-cover"
                loop
                muted
                autoPlay
                playsInline
              />
              <div className="absolute top-4 right-4 bg-black/50 p-2 rounded-full text-white">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
              </div>
            </div>
          ) : (
            <img 
              src={post.media[0].url} 
              alt="Post media" 
              className="w-full h-full object-cover"
            />
          )
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pt-5 pb-3 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className="transition-transform active:scale-95"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill={isLiked ? "#c10023" : "none"} stroke={isLiked ? "#c10023" : "#2d3435"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
          <button className="text-[#2d3435] hover:opacity-70 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
          <button className="text-[#2d3435] hover:opacity-70 transition-opacity">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </div>
        <button className="text-[#2d3435] hover:opacity-70 transition-opacity">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
          </svg>
        </button>
      </div>

      {/* Info & Caption */}
      <div className="px-6 pb-6">
        <p className="font-bold text-[#2d3435] mb-2">{post.likesCount ? post.likesCount.toLocaleString() : 0} likes</p>
        <p className="text-[#2d3435] text-[1.05rem] leading-relaxed mb-3">
          <span className="font-bold mr-2">{post.author.username}</span>
          {post.caption}
        </p>
        <p className="text-[#5a6061] text-xs font-semibold uppercase tracking-wider">{post.timestamp}</p>
      </div>
    </article>
  );
};

// Dummy data matching the Post Schema loosely
const dummyPosts = [
  {
    id: 1,
    author: {
      username: 'archi_tect',
      profilePic: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=100'
    },
    location: 'Berlin, Germany',
    media: [
      {
        url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000',
        media_type: 'image'
      }
    ],
    caption: `Structure and light. The dialogue between concrete and the morning sun in Berlin's central district.`,
    likesCount: 1842,
    timestamp: '2 HOURS AGO'
  },
  {
    id: 2,
    author: {
      username: 'lumiere',
      profilePic: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=100'
    },
    location: 'Paris, France',
    media: [
      {
        url: 'https://vjs.zencdn.net/v/oceans.mp4',
        media_type: 'video'
      }
    ],
    caption: 'Beige is the new black. Season collection sneak peek.',
    likesCount: 3205,
    timestamp: '5 HOURS AGO'
  }
];

const Home = () => {
  return (
    <div className="min-h-screen bg-[#f9f9f9] py-8 px-4 font-sans">
      <div className="max-w-xl mx-auto">
        {/* Top Header / Branding */}
        <header className="flex justify-between items-center mb-10 px-2 sticky top-0 z-10 bg-[#f9f9f9]/90 backdrop-blur-md py-4">
          <h1 className="text-3xl font-bold text-[#2d3435] tracking-tight">The Curator</h1>
          <div className="flex gap-4 text-[#2d3435]">
            <button className="hover:opacity-70 transition-opacity">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </button>
            <button className="hover:opacity-70 transition-opacity">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>
              </svg>
            </button>
          </div>
        </header>

        {/* Feed */}
        <main>
          {dummyPosts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </main>
      </div>
    </div>
  );
};

export default Home;
