import React, { useEffect, useRef, useState } from "react";
import useMesseges from "../hook/useMesseges";
import { useSelector } from "react-redux";
import {
  Phone,
  Video,
  Info,
  Image as ImageIcon,
  Smile,
  Send,
} from "lucide-react";
import { io } from "socket.io-client";
import { useAuth } from "../../auth/Hooks/useAuth";

const URL = "http://localhost:3000";

const Messeges = () => {
  const chats = useSelector((state) => state.messeges.chats);
  const currentChatId = useSelector((store) => store.messeges.currentChatId);
  const loggedInUser = useSelector((store) => store.auth.user);
  const { handleGetChats, handleSetCurrentChatId, handleAppendMessage } =
    useMesseges();
  const { handleGetMe } = useAuth();
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const socketRef = useRef(null);

  console.log("currentChatId", currentChatId);

  function handleSendMessage() {
    socketRef.current.emit("send_message", {
      message,
      receiver: currentChatId,
    });
    handleAppendMessage({
      message,
      receiverId: currentChatId,
      senderId: loggedInUser.id,
      currentChatId: currentChatId,
    });
  }

  useEffect(() => {
    handleGetMe();
    handleGetChats();
  }, []); // Run only once when the component mounts

  useEffect(() => {
    const socket = io(URL, { withCredentials: true });
    socketRef.current = socket;

    socket.once("connect", () => {
      console.log("Connected to socket");
    });

    socket.on("connect_error", (data) => {
      console.log(data);
    });

    socket.on("receive_message", (data) => {
      handleAppendMessage({
        message: data.message,
        receiverId: data.receiver,
        senderId: data.sender,
        currentChatId: data.sender,
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, []);

  return (
    <div className="flex h-full bg-white">
      {/* Left Sidebar - Users List */}
      <div className="w-[350px] border-r border-gray-200 flex flex-col shrink-0">
        {/* Header */}
        <div className="h-20 border-b border-gray-200 flex items-center justify-between px-6 font-semibold text-xl">
          <div>Messages</div>
          <svg
            aria-label="New message"
            className="cursor-pointer"
            color="#000000"
            fill="#000000"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path
              d="M12.202 3.203H5.25a3 3 0 0 0-3 3V18.75a3 3 0 0 0 3 3h12.547a3 3 0 0 0 3-3v-6.952"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <path
              d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 0 1 2.004 0l1.224 1.225a1.417 1.417 0 0 1 0 2.004Z"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></path>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="16.848"
              x2="20.076"
              y1="3.924"
              y2="7.153"
            ></line>
          </svg>
        </div>

        {/* Users List */}
        <div className="flex-1 overflow-y-auto pt-2">
          {chats &&
            chats.map((user) => (
              <div
                key={user._id}
                onClick={() => {
                  setSelectedUser(user);
                  handleSetCurrentChatId(user._id);
                }}
                className={`flex items-center px-6 py-2 cursor-pointer hover:bg-gray-50 transition-colors ${selectedUser?._id === user._id ? "bg-gray-100" : ""}`}
              >
                <img
                  src={
                    user.profilePicture ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  alt={user.username}
                  className="w-14 h-14 rounded-full object-cover border border-gray-200"
                />
                <div className="ml-4 flex-1">
                  <div className="font-semibold text-[15px]">
                    {user.username}
                  </div>
                  <div className="text-gray-500 text-sm mt-0.5">
                    Active today
                  </div>
                </div>
              </div>
            ))}
          {(!chats || chats.length === 0) && (
            <div className="text-center text-gray-500 mt-10 text-sm">
              No messages yet.
            </div>
          )}
        </div>
      </div>

      {/* Right Sidebar - Chat Interface */}
      <div className="flex-1 flex flex-col bg-white">
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="h-20 border-b border-gray-200 flex items-center justify-between px-6">
              <div className="flex items-center">
                <img
                  src={
                    selectedUser.profilePicture ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  alt={selectedUser.username}
                  className="w-11 h-11 rounded-full object-cover border border-gray-200"
                />
                <div className="ml-4 font-semibold text-lg">
                  {selectedUser.username}
                </div>
              </div>
              <div className="flex gap-6 items-center">
                <Phone
                  size={28}
                  className="cursor-pointer text-black"
                  strokeWidth={1.5}
                />
                <Video
                  size={30}
                  className="cursor-pointer text-black"
                  strokeWidth={1.5}
                />
                <Info
                  size={28}
                  className="cursor-pointer text-black"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              <div className="flex flex-col items-center justify-center py-10 text-gray-500 border-b border-gray-100 pb-10 mb-4 shrink-0">
                <img
                  src={
                    selectedUser.profilePicture ||
                    "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                  }
                  alt={selectedUser.username}
                  className="w-24 h-24 rounded-full object-cover mb-4"
                />
                <h2 className="font-bold text-xl text-black">
                  {selectedUser.username}
                </h2>
                <div className="text-sm font-medium mt-1">Instagram</div>
                <button className="mt-4 px-4 py-1.5 bg-gray-100 rounded-lg text-sm font-semibold hover:bg-gray-200 text-black">
                  View Profile
                </button>
              </div>

              {/* Messages Iteration */}
              {chats
                .find((c) => c._id === selectedUser._id)
                ?.messages.map((msg, index) => {
                  const isSentByMe =
                    msg.sender === loggedInUser.id ||
                    msg.sender === loggedInUser._id;

                  return (
                    <div
                      key={index}
                      className={`flex w-full ${
                        isSentByMe ? "justify-end" : "justify-start"
                      }`}
                    >
                      {!isSentByMe && (
                        <img
                          src={
                            selectedUser.profilePicture ||
                            "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
                          }
                          alt="profile"
                          className="w-7 h-7 rounded-full mr-2 self-end mb-1"
                        />
                      )}
                      <div
                        className={`px-4 py-2 text-[15px] max-w-[70%] break-words shadow-sm ${
                          isSentByMe
                            ? "bg-[#0095f6] text-white rounded-2xl rounded-br-sm"
                            : "bg-gray-100 text-black rounded-2xl rounded-bl-sm"
                        }`}
                      >
                        {msg.message}
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Message Input */}
            <div className="p-4 px-6 pb-6">
              <div className="flex items-center gap-3 border border-gray-300 rounded-full px-4 py-3">
                <Smile
                  size={24}
                  className="text-gray-800 cursor-pointer"
                  strokeWidth={1.5}
                />
                <input
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  type="text"
                  placeholder="Message..."
                  className="flex-1 outline-none text-sm bg-transparent"
                />
                <ImageIcon
                  size={24}
                  className="text-gray-800 cursor-pointer"
                  strokeWidth={1.5}
                />
                <Send
                  onClick={handleSendMessage}
                  size={24}
                  className="text-blue-800 cursor-pointer rounded-full"
                  strokeWidth={2}
                />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-28 h-28 rounded-full border-2 border-black flex items-center justify-center mb-4">
              <svg
                aria-label="Direct Messages"
                className="_ab6-"
                color="#000000"
                fill="#000000"
                height="60"
                role="img"
                viewBox="0 0 96 96"
                width="60"
              >
                <circle
                  cx="48"
                  cy="48"
                  fill="none"
                  r="47"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="4"
                ></circle>
                <line
                  fill="none"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="4"
                  x1="69.286"
                  x2="41.447"
                  y1="33.21"
                  y2="48.804"
                ></line>
                <polygon
                  fill="none"
                  points="47.254 73.123 71.376 31.998 24.546 32.002 41.448 48.805 47.254 73.123"
                  stroke="currentColor"
                  strokeLinejoin="round"
                  strokeWidth="4"
                ></polygon>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-black">Your messages</h2>
            <p className="text-sm text-gray-500 mt-2 mb-6">
              Send private photos and messages to a friend or group.
            </p>
            <button className="bg-[#0095f6] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:bg-[#1877f2] transition-colors">
              Send message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messeges;
