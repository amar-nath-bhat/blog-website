import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";

const Hero = ({ title, subTitle, url_image }) => {
  return (
    <section className="flex justify-center">
      <div className="mt-3  uppercase absolute text-white flex flex-col justify-center items-center gap-3 concert-one-regular">
        <h1 className="text-[35px] md:text-[60px] text-deep-orange-400">
          {title ? title : "Welcome to Fouxy"}
        </h1>
        <Link to="/blogs">
          <Button className="text-[15px] md:text-[20px] text-orange-300 concert-one-regular">
            {subTitle ? subTitle : "Start Blogging"}
          </Button>
        </Link>
      </div>

      <img
        className="md:h-[60vh] h-[40vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
        src={url_image || "/blog.avif"}
        alt="blog image"
      />
    </section>
  );
};

export default Hero;
