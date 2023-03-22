import { RouteProps } from "react-router-dom";
import Home from "../pages/home";

export const protectedRoutes: RouteProps[] = [
  {
    path: "/",
    element: <Home />,
  },
];
