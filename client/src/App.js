import React, { useEffect } from "react";
import Navbar from "./component/layout/Navbar";
import Landing from "./component/layout/Landing";
import Login from "./component/auth/Login";
import Register from "./component/auth/Register";
import Dashboard from "./component/dashboard/Dashboard";
import PrivateRoute from "./component/routing/PrivateRoute";
import CreateProfile from "./component/profile-form/CreateProfile";
import AddExperience from "./component/profile-form/AddExperience";
import AddEducation from "./component/profile-form/AddEducation";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utiles/setAuthToken";

import "./App.css";

if (localStorage.token) setAuthToken(localStorage.token);

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <header style={{ marginBottom: "60px" }}>
          <Navbar />
        </header>
        <Routes>
          <Route exact path="/" element={<Landing />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/login" element={<Login />} />
          <Route
            exact
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/create-profile"
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/edit-profile"
            element={
              <PrivateRoute>
                <CreateProfile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add-experience"
            element={
              <PrivateRoute>
                <AddExperience />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/add-education"
            element={
              <PrivateRoute>
                <AddEducation />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
