// src/routes/clientRoutes.js
import Home from "@/pages/client/Home/Home";
import Login from "@/pages/client/Login";
import Register from "@/pages/client/Login";
import NotFound from "@/pages/client/NotFound";
import DefaultLayout from "@/components/layout/DefaultLayout";
import About from "@/pages/client/About";

const clientRoutes = [
  {
    path: "/",
    component: Home,
    layout: DefaultLayout,
    exact: true,
  },
  {
    path: "/login",
    component: Login,
    exact: true,
  },
  {
    path: "/register",
    component: Register,
    exact: true,
  },
  {
    path: "/about",
    component: About,
    layout: DefaultLayout,
  },
  {
    path: "*",
    component: NotFound,
    layout: DefaultLayout,
  },
];

export default clientRoutes;
