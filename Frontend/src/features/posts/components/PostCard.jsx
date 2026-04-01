import React, { useState } from 'react'

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const handleNextMedia = () => {
    if (post.media && currentMediaIndex < post.media.length - 1) {
      setCurrentMediaIndex((prev) => prev + 1);
    }
  };

  const handlePrevMedia = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex((prev) => prev - 1);
    }
  };

  return (
    <article className="bg-[#ffffff] rounded-2xl mb-12 shadow-[0_8px_32px_rgba(45,52,53,0.04)] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-linear-to-tr from-[#5e5e5e] to-[#c10023] p-[2px]">
            <img 
              src={post.author.profilePicture || "https://i.pravatar.cc/150"} 
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

      {/* Media Carousel */}
      <div className="w-full aspect-square relative overflow-hidden bg-black">
        {post.media && post.media.length > 0 && (
          <>
            <div 
              className="flex w-full h-full transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentMediaIndex * 100}%)` }}
            >
              {post.media.map((mediaItem, idx) => (
                <div key={idx} className="w-full h-full shrink-0 relative flex items-center justify-center overflow-hidden">
                  {mediaItem.media_type === 'video' ? (
                    <div className="w-full h-full relative group cursor-pointer">
                      <video 
                        src={mediaItem.url} 
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
                      src={mediaItem.url} 
                      alt={`Post media ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            {post.media.length > 1 && (
              <>
                {currentMediaIndex > 0 && (
                  <button 
                    onClick={handlePrevMedia} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-black shadow-md transition-colors z-10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>
                )}
                
                {currentMediaIndex < post.media.length - 1 && (
                  <button 
                    onClick={handleNextMedia} 
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/70 hover:bg-white text-black shadow-md transition-colors z-10"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                )}

              </>
            )}
          </>
        )}
      </div>

      {/* Actions */}
      <div className="px-6 pt-5 pb-3 flex justify-between items-center relative">
        {/* Dots indicator */}
        {post.media && post.media.length > 1 && (
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center gap-1.5 mt-1">
            {post.media.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all ${idx === currentMediaIndex ? 'w-1.5 bg-[#0095f6]' : 'w-1.5 bg-neutral-300'}`} 
              />
            ))}
          </div>
        )}
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

export default PostCard