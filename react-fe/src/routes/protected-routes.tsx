import { RouteProps } from "react-router-dom";
import Home from "../pages/home";
import Profile from "../pages/profile";
import CompanyList from "../pages/company-list";
import CompanyDetail from "../pages/company-detail";

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
  },
  {
    path: '/company/:id',
    element: <CompanyDetail />
  }
];
