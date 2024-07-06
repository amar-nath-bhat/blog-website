import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <DataProvider>
        <BrowserRouter>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Routes>
            <Route
              path="/signup"
              element={<PublicRoute component={Signup} />}
            />
            <Route
              path="/login"
              element={
                <PublicRoute
                  component={Login}
                  isUserAuthenticated={setIsAuthenticated}
                />
              }
            />
            <Route path="/" element={<PublicRoute component={Home} />} />
            <Route
              path="/blogs"
              element={
                <PrivateRoute
                  component={Blogs}
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
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
