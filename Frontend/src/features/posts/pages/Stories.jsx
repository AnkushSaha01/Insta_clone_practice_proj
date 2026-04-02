
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { usePost } from '../hooks/usePosts'


const Stories = () => {
  const {handleGetStories} = usePost()
  useEffect(() => {
    handleGetStories()
  }, [])
  const [activeStoryIndex, setActiveStoryIndex] = useState(null)

  const stories = useSelector((state) => state.story.stories)

  const [activeMediaIndex, setActiveMediaIndex] = useState(0)

  const nextStory = () => {
    if (activeStoryIndex === null) return;
    const currentStory = stories[activeStoryIndex];
    if (activeMediaIndex < currentStory.media.length - 1) {
      setActiveMediaIndex(prev => prev + 1);
    } else {
      if (activeStoryIndex < stories.length - 1) {
        setActiveStoryIndex(prev => prev + 1);
        setActiveMediaIndex(0);
      } else {
        setActiveStoryIndex(null);
      }
    }
  }

  const prevStory = () => {
    if (activeStoryIndex === null) return;
    if (activeMediaIndex > 0) {
      setActiveMediaIndex(prev => prev - 1);
    } else {
      if (activeStoryIndex > 0) {
        setActiveStoryIndex(prev => prev - 1);
        setActiveMediaIndex(stories[activeStoryIndex - 1].media.length - 1);
      }
    }
  }

  return (
    <>
      <section className="mb-10 overflow-x-auto overflow-y-hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        <div className="flex gap-6 py-2 px-2">
          {/* Story Items */}
          {stories.map((story, idx) => (
            <div key={story.id} className="flex-none flex flex-col items-center gap-2 cursor-pointer group" onClick={() => { setActiveStoryIndex(idx); setActiveMediaIndex(0); }}>
              <div className="w-16 h-16 rounded-full p-[2px] bg-white border border-[#c6c6c6]/30 ring-2 ring-[#c6c6c6]/10 group-hover:scale-105 transition-transform duration-300 shadow-sm">
                <img alt={story.author.username} src={story.author.profilePicture} className="w-full h-full rounded-full object-cover" />
              </div>
              <span className="text-[10px] uppercase tracking-widest font-medium text-[#1a1c1c]">{story.author.username}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Story Viewer Modal */}
      {activeStoryIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-0 md:p-10 animate-fade-in">
          {/* Navigation - Left */}
          <button onClick={prevStory} className={`hidden md:flex absolute left-8 z-50 hover:text-white transition-colors duration-300 ${(activeStoryIndex === 0 && activeMediaIndex === 0) ? 'text-white/10 cursor-not-allowed' : 'text-white/50 cursor-pointer'}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
          </button>
          
          {/* Story Container */}
          <div className="relative w-full max-w-[480px] aspect-[9/16] bg-black overflow-hidden md:rounded-xl shadow-2xl flex flex-col">
            {/* Full Screen Portrait Photo */}
            <div className="absolute inset-0">
              {stories[activeStoryIndex]?.media?.[activeMediaIndex]?.media_type === "video" ? (
                <video className="w-full h-full object-cover bg-black" src={stories[activeStoryIndex]?.media?.[activeMediaIndex]?.url} controls autoPlay loop />
              ) : (
                <img className="w-full h-full object-cover bg-black" src={stories[activeStoryIndex]?.media?.[activeMediaIndex]?.url} alt="Story" />
              )}
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/40 pointer-events-none"></div>
            </div>
            
            {/* Top Header Layer */}
            <div className="relative z-10 p-4 space-y-4">
              {/* Progress Bar */}
              <div className="flex gap-1.5 h-[2px] w-full bg-white/20">
                {stories[activeStoryIndex]?.media?.map((_, idx) => (
                  <div key={idx} className={`h-full w-full rounded-full ${idx < activeMediaIndex ? 'bg-white/40' : idx === activeMediaIndex ? 'bg-white' : 'bg-white/20'}`}></div>
                ))}
              </div>
              
              {/* User Info */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
                    <img className="w-full h-full object-cover" src={stories[activeStoryIndex]?.author?.profilePicture} alt="" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-white text-sm font-semibold tracking-tight">{stories[activeStoryIndex]?.author?.username}</span>
                    <span className="text-white/50 text-[10px] uppercase tracking-[0.1em] font-medium">Just now</span>
                  </div>
                </div>
                {/* Close Button */}
                <button onClick={() => setActiveStoryIndex(null)} className="p-1 hover:bg-white/20 rounded-full transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Interactive Regions for Mobile */}
            <div className="absolute inset-0 z-0 flex pt-24">
              <div className="w-1/3 h-full cursor-pointer" onClick={prevStory}></div>
              <div className="w-2/3 h-full cursor-pointer" onClick={nextStory}></div>
            </div>
            
            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 w-full p-8 z-10 pointer-events-none">
              <div className="flex flex-col gap-2">
                <span className="text-white text-lg font-medium tracking-tight drop-shadow-md"></span>
              </div>
            </div>
          </div>
          
          {/* Navigation - Right */}
          <button onClick={nextStory} className={`hidden md:flex absolute right-8 z-50 hover:text-white transition-colors duration-300 cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

export default Stories