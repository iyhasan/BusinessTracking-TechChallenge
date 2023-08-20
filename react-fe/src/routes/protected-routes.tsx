import { RouteProps } from "react-router-dom";
import Home from "../pages/home";
import Profile from "../pages/profile";
import CompanyList from "../pages/company-list";

export const protectedRoutes: RouteProps[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: '/companies',
    element: <CompanyList />
  }
];
