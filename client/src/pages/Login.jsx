import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api.js";
import { useDispatch } from "react-redux";
import { _login, _logout } from "../app/authSlice.js";
import toast, { Toaster } from "react-hot-toast";

const loginInitialValue = {
  username: "",
  password: "",
};

function Login({ isUserAuthenticated }) {
  const [login, setLogin] = useState(loginInitialValue);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await API.userLogin(login);
      if (response.data.isSuccess) {
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        sessionStorage.setItem(
          "userData",
          JSON.stringify({
            username: response.data.user.username,
            name: response.data.user.name,
            userId: response.data.user._id,
          })
        );

        dispatch(
          _login({
            username: response.data.user.username,
            name: response.data.user.name,
            userId: response.data.user._id,
          })
        );

        isUserAuthenticated(true);
        setLogin(loginInitialValue);
        toast.success("Login successful");
        navigate("/");
      } else {
        dispatch(_logout());
        toast.error(response.data.msg);
        isUserAuthenticated(false);
      }
    } catch (e) {
      toast.error("Login failed");
      console.log(e.message);
    }
  };

  return (
    <div className="flex justify-center pt-24 min-h-[75vh]">
      <Toaster />

      <div
        className="rounded-2xl shadow-lg shadow-black border-black md:p-16 p-6 concert-one-regular flex flex-col items-center justify-start md:text-4xl text-xl w-fit h-full"
        style={{ backgroundColor: "#ff9570" }}
      >
        <img
          src="logo-no-bg.png"
          alt="Fouxy"
          className="w-16 h-16 md:w-24 md:h-24 hover-button"
        />
        <form className="flex flex-col justify-center gap-3">
          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="mt-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              className="rounded-lg p-2 border border-solid border-gray-500  "
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              className="rounded-lg p-2 border border-solid border-gray-500"
            />
          </div>
          <div className="flex flex-col items-center justify-center mt-3 gap-2">
            <button className="hover-button" onClick={(e) => loginUser(e)}>
              Login
            </button>
            <span className="text-xl md:text-3xl text-white">OR</span>
            <button
              className="hover-button"
              onClick={() => navigate("/signup")}
            >
              Don't have an account?
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
