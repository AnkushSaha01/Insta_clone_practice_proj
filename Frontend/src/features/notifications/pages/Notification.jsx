import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNotification } from "../hooks/useNotification";
import { useEffect } from "react";



const Notification = () => {
  // const [requests, setRequests] = useState(DUMMY_REQUESTS);
  const requests = useSelector((state) => state.notification.followReqs);
  const { handleGetFollowReq, handleAcceptFollowReq } = useNotification();
  useEffect(() => {
    handleGetFollowReq();
  }, []);
  const dispatch = useDispatch();

  const handleAccept = (id) => {
    handleAcceptFollowReq({ reqId: id });
  };

  const handleReject = (id) => {
    dispatch(rejectFollowReq(id));
  };

  return (
    <div className="min-h-screen bg-[#f9f9f9] text-[#2d3435] p-6 pb-24 md:pb-6 font-['Be_Vietnam_Pro',sans-serif]">
      {/* Header */}
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">
        Follow Requests
      </h1>

      {/* Requests List */}
      <div className="max-w-2xl mx-auto space-y-6">
        {requests.length > 0 ? (
          requests.map((req) => (
            <div
              key={req.follower._id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow-[0_8px_32px_rgba(45,52,53,0.04)] hover:bg-[#f2f4f4] transition-colors duration-300"
            >
              <div className="flex items-center gap-4">
                <img
                  src={req.follower.profilePicture}
                  alt={req.follower.username}
                  className="w-12 h-12 rounded-full object-cover shadow-sm bg-[#ebeeef]"
                />
                <div className="flex flex-col">
                  <span className="font-semibold text-[15px]">
                    {req.follower.username}
                  </span>
                  <span className="text-sm text-[#5a6061]">{req.follower.fullname}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {req.status === "pending" ? (
                  <>
                    <button
                      onClick={() => handleAccept(req._id)}
                      className="px-6 py-2 bg-[#2d3435] text-white text-sm font-medium rounded-md hover:bg-[#0c0f0f] active:scale-95 transition-all duration-200"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="px-6 py-2 bg-transparent text-[#2d3435] text-sm font-medium border border-[#adb3b4] border-opacity-50 rounded-md hover:bg-[#f2f4f4] active:scale-95 transition-all duration-200"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-[#5a6061]">Accepted</span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-[#5a6061]">
            <p>No new follow requests.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notification;
