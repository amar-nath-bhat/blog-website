import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api.js";
import { DataContext } from "../context/DataProvider.jsx";
import { Button } from "./Button.jsx";

const signupInitialValue = {
  name: "",
  username: "",
  password: "",
  confirm_password: "",
};
const loginInitialValue = {
  username: "",
  password: "",
};

function Signup({ isUserAuthenticated, type }) {
  const [accState, setAccState] = useState(type);
  const [signup, setSignup] = useState(signupInitialValue);
  const [login, setLogin] = useState(loginInitialValue);
  const [error, showError] = useState("");

  useEffect(() => {
    showError(false);
  }, [login]);

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const toggleAccState = (e) => {
    // e.preventDefault();
    if (accState === "signup") {
      setAccState("login");
    } else {
      setAccState("signup");
    }
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      console.log(signup);
      let response = await API.userSignup(signup);
      console.log(response);
      if (response.isSuccess) {
        showError("");
        setSignup(signupInitialValue);
        toggleAccState(e);
        console.log(accState);
      } else {
        console.log(accState);
        showError(response.message);
      }
    } catch (e) {
      console.log(e.message);

      showError(e.message);
    }
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      let response = await API.userLogin(login);
      if (response.isSuccess) {
        showError("");

        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );
        setAccount({
          name: response.data.name,
          username: response.data.username,
        });

        isUserAuthenticated(true);
        setLogin(loginInitialValue);
        navigate("/");
      } else {
        showError(response.message);
      }
    } catch (e) {
      console.log(e.message);
      showError(e.message);
    }
  };

  return (
    <div className="flex justify-center pt-24">
      <div
        className="rounded-2xl shadow-lg shadow-black border-black md:p-16 p-6 concert-one-regular flex flex-col items-center justify-start md:text-4xl text-2xl w-fit h-full"
        style={{ backgroundColor: "#ff9570" }}
      >
        <img
          src="logo-no-bg.png"
          alt="Fouxy"
          className="w-16 h-16 md:w-24 md:h-24"
        />
        <form className="flex flex-col justify-center">
          {accState === "signup" ? (
            <>
              <label htmlFor="name" className="">
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={signup.name}
                onChange={(e) => onInputChange(e)}
                className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500  "
              />

              <label htmlFor="username" className="mt-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={signup.username}
                onChange={(e) => onInputChange(e)}
                className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500  "
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={signup.password}
                onChange={(e) => onInputChange(e)}
                className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500"
              />

              <label htmlFor="confirm_password">Confirm Password: </label>
              <input
                type="password"
                id="confirm_password"
                name="confirm_password"
                value={signup.confirm_password}
                onChange={(e) => onInputChange(e)}
                className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500"
              />

              {error && <p className="text-red-500 text-base">{error}</p>}
              <div className="flex flex-col items-center mt-3 gap-2">
                <Button text="Signup" onClicked={signupUser} />

                <span className="text-xl md:text-3xl text-white">OR</span>
                <Button
                  text="Already have an account?"
                  onClicked={toggleAccState}
                />
              </div>
            </>
          ) : (
            <>
              <label htmlFor="username" className="mt-2">
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={login.username}
                onChange={(e) => onValueChange(e)}
                className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500  "
              />

              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={login.password}
                onChange={(e) => onValueChange(e)}
                className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500"
              />
              {error && <p className="text-red-500 text-base">{error}</p>}
              <div className="flex flex-col items-center justify-center mt-3 md:mt-5 gap-2 md:gap-5">
                <Button text="Login" onClicked={loginUser} />
                <span className="text-xl md:text-3xl text-white">OR</span>
                <Button
                  text="Don't have an account?"
                  onClicked={toggleAccState}
                />
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default Signup;
