import { PropsWithChildren } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useAppDispatch, useAppSelector } from "./GlobalStateConfig";
import { loginAsync } from "../reducers/auth";

const TempComponent = () => {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  console.log(auth);
  return (
    <button
      onClick={async () =>
        await dispatch(
          loginAsync({ email: "123@gmail.com", password: "1231231" })
        )
      }>
      Login
    </button>
  );
};

export const routes = [
  { path: "/", Component: () => <TempComponent /> },
  /*{ path: "/", Component: () => <Landing /> },
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
        <CreateProfile />
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
  */
];
const MainLayout = () => {
  return <Navbar />;
};
const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route
          path="*"
          element={
            <div className="container">
              <h1>Not Found</h1>
            </div>
          }
        />
        {routes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            element={
              <div className="container">
                <Component />
              </div>
            }
          />
        ))}
      </Route>
    </Routes>
  );
};
export const RouterConfig = ({ children }: PropsWithChildren) => {
  return (
    <BrowserRouter>
      <AppRoutes />
      {children}
    </BrowserRouter>
  );
};
