import { useState } from "react";
import Navbar from "./components/Navbar";
import Signup from "./components/Signup";
import Home from "./components/Home";
import About from "./components/About";
import Blogs from "./components/Blogs";
import DataProvider from "./context/DataProvider";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  const token = sessionStorage.getItem("accessToken");
  return (
    <>{isAuthenticated && token ? <Outlet /> : <Navigate to="/signup" />}</>
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <DataProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/signup"
              element={
                <Signup
                  isUserAuthenticated={isUserAuthenticated}
                  type="signup"
                />
              }
            />
            <Route
              path="/login"
              element={
                <Signup
                  isUserAuthenticated={isUserAuthenticated}
                  type="login"
                />
              }
            />

            <Route
              path="/"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/" element={<Home />} />
            </Route>

            <Route
              path="/about"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/about" element={<About />} />
            </Route>

            <Route
              path="/blogs"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/blogs" element={<Blogs />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
