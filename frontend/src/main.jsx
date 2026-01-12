import ReactDOM from "react-dom/client";
import React from "react";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Auth/Login.jsx";
import Register from "./pages/Auth/Register.jsx";

import Home from "./pages/Home.jsx";
import PrivateRoute from "./pages/Auth/PrivateRoute.jsx";
import Profile from "./pages/User/Profile.jsx";
import Genrelist from "./pages/Admin/Genrelist.jsx";
import Createmovie from "./pages/Admin/Createmovie.jsx";
import AdminmovieList from "./pages/Admin/AdminmovieList.jsx";
import Updatemovie from "./pages/Admin/Updatemovie.jsx";
import Allmovies from "./pages/Movies/Allmovies.jsx";
import MovieDetails from "./pages/Movies/MovieDetails.jsx";
import AllComments from "./pages/Admin/AllComments.jsx";
import AdminDashboard from "./pages/Admin/dashboard/AdminDashbaoard.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<Home />} />
      <Route path="/movies" element={<Allmovies />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/Profile" element={<Profile />} />
      </Route>
      <Route path="" element={<AdminRoutes />}>
        <Route path="/admin/movies/genre" element={<Genrelist />} />
        <Route path="/admin/movies/addmovie" element={<Createmovie />} />
        <Route
          path="/admin/movies/adminmovielist"
          element={<AdminmovieList />}
        />
        <Route path="/admin/movies/updatemovie/:id" element={<Updatemovie />} />
        <Route path="/movies/:id/" element={<MovieDetails />} />
        <Route path="/admin/movies/comments" element={<AllComments />} />
        <Route path="/admin/movies/dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
