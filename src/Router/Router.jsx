import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import Login from "../pages/auth/Login";
import UserRegister from "../pages/auth/UserRegister";
import BusinessRegister from "../pages/auth/BusinessRegister";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <UserRegister />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/business-register",
    element: <BusinessRegister />,
    errorElement: <ErrorPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
