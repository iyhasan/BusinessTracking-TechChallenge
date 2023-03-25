import { RouteProps } from "react-router-dom";
import Home from "../pages/home";
import Profile from "../pages/profile";

export const protectedRoutes: RouteProps[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />
  }
];
