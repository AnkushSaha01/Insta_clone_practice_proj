import { createBrowserRouter, Navigate } from "react-router";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Home from "../features/posts/pages/Home";
import Layout from "./Layout";
import CreatePost from "../features/posts/pages/CreatePost";
import Search from "../features/users/pages/Search";


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
