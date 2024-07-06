import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../services/api.js";

const signupInitialValue = {
  name: "",
  username: "",
  password: "",
  confirm_password: "",
};

function Signup() {
  const [signup, setSignup] = useState(signupInitialValue);

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const signupUser = async (e) => {
    e.preventDefault();
    try {
      // console.log(signup);
      let response = await API.userSignup(signup);
      console.log(response);
      if (response.isSuccess) {
        setSignup(signupInitialValue);
        console.log(accState);
      } else {
        console.log(accState);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="flex justify-center p-24 min-h-[75vh]">
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
            <label htmlFor="name" className="">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={signup.name}
              onChange={(e) => onInputChange(e)}
              className="rounded-lg p-2 border border-solid border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="username" className="mt-2">
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={signup.username}
              onChange={(e) => onInputChange(e)}
              className="rounded-lg p-2 border border-solid border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={signup.password}
              onChange={(e) => onInputChange(e)}
              className="rounded-lg p-2 border border-solid border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="confirm_password">Confirm Password: </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              value={signup.confirm_password}
              onChange={(e) => onInputChange(e)}
              className="rounded-lg p-2 border border-solid border-gray-500"
              required
            />
          </div>

          <div className="flex flex-col items-center mt-3 gap-2">
            <button className="hover-button" onClick={(e) => signupUser(e)}>
              Signup
            </button>

            <span className="text-xl md:text-3xl text-white">OR</span>
            <button className="hover-button" onClick={() => navigate("/login")}>
              Already have an account?{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
