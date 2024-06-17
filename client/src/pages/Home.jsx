import BlogPost from "../components/BlogPost";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { blogs } from "../constants/data";
const Home = () => {
  return (
    <div className="px-5 md:px-10 pb-10 flex flex-col gap-5 md:gap-10">
      <section className="flex justify-center">
        <div className="mt-3 concert-one-regular uppercase absolute text-white flex flex-col justify-center items-center gap-3 ">
          <h1 className="text-[35px] md:text-[60px] text-deep-orange-400">
            Welcome to Fouxy!
          </h1>
          <Link to="/blogs">
            <Button className="text-[15px] md:text-[20px] text-orange-300 concert-one-regular pb-4 md:pb-5">
              Start Blogging
            </Button>
          </Link>
        </div>

        <img
          className="md:h-[60vh] h-[40vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
          src="blog.avif"
          alt="blog image"
        />
      </section>
      <section className="md:px-7 lg:px-72">
        <div className="mt-3 md:mt-0">
          <h1 className="text-4xl concert-one-regular uppercase">Top Blogs</h1>
          <div className="grid grid-cols-1 gap-10 blog-post-content-font mt-5 w-full">
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
        </div>
      </section>
    </div>
  );
};

export default Home;
