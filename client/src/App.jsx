// imports
import { useState } from "react";

// Pages/Components
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import CreateBlog from "./pages/CreateBlog";
import Post from "./pages/Post";
import Update from "./pages/Update";

// Context
import DataProvider from "./context/DataProvider";

// Router
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
    <>
      {isAuthenticated && token ? (
        <>
          <Navbar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/signup" />
      )}
    </>
  );
};

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <>
      <DataProvider>
        <BrowserRouter>
          {/* <Navbar /> */}

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
              path="/blogs"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/blogs" element={<Blogs />} />
            </Route>

            <Route
              path="/create"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/create" element={<CreateBlog />} />
            </Route>

            <Route
              path="/post/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/post/:id" element={<Post />} />
            </Route>

            <Route
              path="/update/:id"
              element={<PrivateRoute isAuthenticated={isAuthenticated} />}
            >
              <Route path="/update/:id" element={<Update />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </DataProvider>
    </>
  );
}

export default App;
