import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import ErrorPage from "../components/ErrorPage";
import Login from "../pages/auth/Login";
import UserRegister from "../pages/auth/UserRegister";
import BusinessRegister from "../pages/auth/BusinessRegister";
import Profile from "../pages/Profıle/Profile";
import Inventory from "../pages/Inventory/Inventory";
import QrMenu from "../pages/QrMenu/QrMenu";

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
  {
    path: "/profile/:userId",
    element: <Profile />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/inventory",
    element: <Inventory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/inventory/:inventoryId",
    element: <Inventory />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/qr-menu",
    element: <QrMenu />,
    errorElement: <ErrorPage />,
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
