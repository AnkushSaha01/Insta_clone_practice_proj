import { createBrowserRouter, Navigate } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/posts/pages/Home";
import Layout from "./Layout";
import CreatePost from "../features/posts/pages/CreatePost";
import Search from "../features/users/pages/Search";
import Notification from "../features/notifications/pages/Notification";
import Profile from "../features/profile/pages/Profile";
import Messeges from "../features/messeges/pages/Messeges";


const authRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        index: true,
        element: <Navigate to="/home" replace />,
      },
      {
        path: "create",
        element: <CreatePost />
      },
      {
        path: "search",
        element: <Search />
      },
      {
        path: "notifications",
        element: <Notification />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "messages",
        element: <Messeges />
      }
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default authRoutes;
