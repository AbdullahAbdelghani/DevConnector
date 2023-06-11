import { FC, PropsWithChildren } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Landing from "../components/layout/Landing";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import PrivateRoute from "../components/routing/PrivateRoute";
import Dashboard from "../components/dashboard/Dashboard";
import CreateProfile from "../components/profile-form/CreateProfile";
import AddExperience from "../components/profile-form/AddExperience";
import AddEducation from "../components/profile-form/AddEducation";
import UpdateProfile from "../components/profile-form/UpdateProfile";
import Profiles from "../components/profiles/Profiles";
import Profile from "../components/profile/Profile";
import Posts from "../components/posts/Posts";
import Post from "../components/post/Post";

export const routes: { path: string; Component: () => JSX.Element }[] = [
  { path: "/", Component: () => <Landing /> },
  { path: "/register", Component: () => <Register /> },
  { path: "/login", Component: () => <Login /> },
  {
    path: "/dashboard",
    Component: () => (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
  },
  {
    path: "/create-profile",
    Component: () => (
      <PrivateRoute>
        <CreateProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/edit-profile",
    Component: () => (
      <PrivateRoute>
        <UpdateProfile />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-experience",
    Component: () => (
      <PrivateRoute>
        <AddExperience />
      </PrivateRoute>
    ),
  },
  {
    path: "/add-education",
    Component: () => (
      <PrivateRoute>
        <AddEducation />
      </PrivateRoute>
    ),
  },
  { path: "/profiles", Component: () => <Profiles /> },
  { path: "/profile/:id", Component: () => <Profile /> },
  {
    path: "/posts",
    Component: () => (
      <PrivateRoute>
        <Posts />
      </PrivateRoute>
    ),
  },
  {
    path: "/post/:id",
    Component: () => (
      <PrivateRoute>
        <Post />
      </PrivateRoute>
    ),
  },
];
const MainLayout: FC = (): JSX.Element => {
  return <Navbar />;
};
const AppRoutes: FC = (): JSX.Element => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="*" element={<h1>Not Found</h1>} />
        {routes.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
    </Routes>
  );
};
export const RouterConfig: FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  return (
    <BrowserRouter>
      <AppRoutes />
      {children}
    </BrowserRouter>
  );
};
