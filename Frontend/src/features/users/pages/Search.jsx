import { useEffect, useState } from "react";
import React from "react";
import { useUser } from "../hooks/useUser";
import debounce from "lodash/debounce";
import { useMemo } from "react";

const Search = () => {
  const { handleSearchUser } = useUser();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchSearchUserData(query) {
    const users = await handleSearchUser({ query });
    setResults(users);
  }

  const debouncedSearch = useMemo(()=>debounce((query)=>{
        setLoading(true)
        fetchSearchUserData(query)
        setLoading(false)
    },500),[]);

  useEffect(() => {
    if (!query) {
      return;
    }
    debouncedSearch(query);
  }, [query]);

  return (
    <div className="max-w-2xl mx-auto flex flex-col items-center pt-10">
      {/* Minimalist Search Interface */}
      <div className="w-full mb-14">
        <div className="relative group">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-[#f3f3f4] border-none focus:ring-0 rounded-lg h-14 px-12 text-[#1a1c1c] placeholder:text-[#474747]/50 transition-all duration-300 focus:bg-[#ffffff] focus:shadow-[0px_12px_40px_rgba(0,0,0,0.04)] outline-none"
            placeholder="Search curators, aesthetics, eyes..."
            type="text"
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#474747]/60">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Single Result Canvas */}
      {results.map((user)=>{
        return (<div className="w-full animate-fade-in">
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
          <button className="bg-[#000000] text-[#e2e2e2] px-6 py-2 rounded-lg text-sm font-medium hover:opacity-90 active:scale-95 transition-all">
            Follow
          </button>
        </div>
      </div>)
      })}

      {results.length === 0 && (
        <div className="text-center text-[#474747] mt-10">
          No results found
        </div>
      )}
    </div>
  );
};

export default Search;
