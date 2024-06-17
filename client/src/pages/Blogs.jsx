import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Sidebar from "../components/Sidebar";
import BlogPost from "../components/BlogPost";
import { blogs } from "../constants/data";
const Blogs = () => {
  return (
    <div className="px-5 md:px-10 pb-10 flex flex-col gap-5 md:gap-10">
      <section className="flex justify-center">
        <div className="mt-3 concert-one-regular uppercase absolute text-white flex flex-col justify-center items-center gap-3 ">
          <h1 className="text-[35px] md:text-[60px] text-deep-orange-400">
            Explore Blogs!
          </h1>
          <Link to="/create">
            <Button
              className="text-[15px] md:text-[20px] text-orange-300 concert-one-regular pb-4 md:pb-5"
              color=""
            >
              Create Your Own Blog
            </Button>
          </Link>
        </div>

        <img
          className="md:h-[60vh] h-[40vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
          src="blog.avif"
          alt="blog image"
        />
      </section>
      <section className="flex md:flex-row lg:flex-row flex-col gap-10">
        <Sidebar className="" />
        <div className="grid grid-cols-1 gap-10 blog-post-content-font w-full">
          {blogs.map((blog, index) => (
            <div key={index}>
              <BlogPost
                heading={blog.heading}
                description={blog.description}
                category={blog.category}
                author={blog.author}
                likes={blog.likes}
                img={blog.img}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
