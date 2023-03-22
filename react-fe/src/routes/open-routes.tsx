import { RouteProps } from "react-router-dom";
import LoginPage from "../pages/login";

export const openRoutes: RouteProps[] = [
  {
    path: "/login",
    element: <LoginPage />,
  },
];
