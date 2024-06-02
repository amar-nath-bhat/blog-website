import React from "react";

function Signup() {
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
          className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500  "
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500"
        />

        <label htmlFor="password">Confirm Password:</label>
        <input
          type="password"
          id="confirm_password"
          name="confirm_password"
          className="rounded-lg mt-2 md:mt-4 px-2 pb-2 border border-solid border-gray-500"
        />

        <div className="flex flex-col items-center mt-3 gap-2">
          <button type="submit" className="">
            Signup
          </button>
          <span className="text-xl md:text-3xl mt-1 text-white">OR</span>
          <a href="/login">Already have an account?</a>
        </div>
      </form>
    </div>
  );
}

export default Signup;
