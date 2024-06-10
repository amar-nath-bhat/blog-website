import React from "react";
import { useState } from "react";
import { API } from "../services/api.js";

const loginInitialValue = {
  username: "",
  password: "",
};

function Login() {
  const [login, setLogin] = useState(loginInitialValue);

  const onInputChange = (e) => {
    e.preventDefault();
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    let response = await API.userLogin(login);
  };

  return (
    <div className="rounded-2xl shadow-lg shadow-black border-black m-8 md:mx-auto md:my-16 md:p-16 p-6 concert-one-regular flex flex-col items-center justify-start md:text-4xl text-2xl w-fit h-fit">
      <img
        src="logo-no-bg.png"
        alt="Fouxy"
        className="w-16 h-16 md:w-24 md:h-24"
      />
      <form className="flex flex-col justify-center">
        <label htmlFor="username" className="mt-2">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={(e) => onInputChange(e)}
          className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500  "
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => onInputChange(e)}
          className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500"
        />

        <div className="flex flex-col items-center justify-center mt-3 md:mt-5 gap-2 md:gap-5">
          <button type="submit" className="">
            Login
          </button>
          <span className="text-xl md:text-3xl text-white mt-1">OR</span>
          <a href="/signup">Don't have an account?</a>
        </div>
      </form>
    </div>
  );
}

export default Login;
