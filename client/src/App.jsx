import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { _login } from "./app/authSlice";

// Pages/Components
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Post from "./pages/Post";
import Update from "./pages/Update";
import Login from "./pages/Login";

// Context
import DataProvider from "./context/DataProvider";

// RouteComponents
import { PublicRoute, PrivateRoute } from "./components/Route";

// LoadingScreen Component
import LoadingScreen from "./components/Loading";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const userData = JSON.parse(sessionStorage.getItem("userData"));

    if (accessToken && refreshToken && userData) {
      dispatch(_login(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [dispatch]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
        {loading ? (
          <LoadingScreen />
        ) : (
          <Routes>
            <Route
              path="/signup"
              element={<PublicRoute component={Signup} />}
            />
            <Route
              path="/login"
              element={
                <PublicRoute
                  component={() => (
                    <Login isUserAuthenticated={setIsAuthenticated} />
                  )}
                />
              }
            />
            <Route
              path="/"
              element={
                <PublicRoute
                  component={() => (
                    <Home loading={loading} setLoading={setLoading} />
                  )}
                />
              }
            />
            <Route
              path="/blogs"
              element={
                <PrivateRoute
                  component={() => (
                    <Blogs loading={loading} setLoading={setLoading} />
                  )}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute
                  component={CreateBlog}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/post/:id"
              element={
                <PrivateRoute
                  component={Post}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route
              path="/update/:id"
              element={
                <PrivateRoute
                  component={Update}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
          </Routes>
        )}
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
