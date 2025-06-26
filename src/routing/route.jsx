import {
  createBrowserRouter,
} from "react-router-dom";
import UserLayout from "../../layout/userLayout";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import UserProtection from "./UserProtection";
import Profile from "../pages/Profile";
import CreateBlog from "../pages/CreateBlog";
import EditBlog from "../pages/UpdateBlog";
import NotFound from "../pages/NotFound";
import BlogList from "../pages/BlogList";
import BlogDetails from "../pages/BlogDetails";
import MyBlogs from "../pages/MyBlogs";
import About from "../pages/About";
import EditProfile from "../pages/EditProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: 'register',
        element: <Register />
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'blog-list',
        element: <BlogList />
      },
      {
        path: 'blog-list/blog-details/:id',
        element: <BlogDetails />
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "user",
        element: <UserProtection />,
        children: [
          {
            path: "profile",
            element: <Profile />
          },
          {
            path: "create-blog",
            element: <CreateBlog />
          },
          {
            path:"my-blog",
            element:<MyBlogs/>
          },
          {
             path:"profile/edit",
             element:<EditProfile/>
          },
          {
            path: "my-blog/edit-blog/:id",
            element: <EditBlog />
          },

        ]
      }
    ]
  },
]);