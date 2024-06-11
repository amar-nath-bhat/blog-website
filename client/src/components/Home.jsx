import React from "react";
import Sidebar from "./Sidebar";
import BlogPost from "./BlogPost";

const Home = () => {
  const blogs = [
    {
      heading: "Blog 1",
      description: "Description 1",
      category: "Category 1",
      author: "Author 1",
      likes: 10,
      img: "blog-pic.webp",
    },
    {
      heading: "Blog 1",
      description: "Description 1",
      category: "Category 1",
      author: "Author 1",
      likes: 10,
      img: "blog-pic.webp",
    },
  ];
  return (
    <>
      <div className="flex p-10 gap-10 concert-one-regular text-2xl">
        <Sidebar />
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl">Top Blogs</h1>
          {blogs.map((blog, index) => (
            <BlogPost
              key={index}
              heading={blog.heading}
              description={blog.description}
              category={blog.category}
              author={blog.author}
              likes={blog.likes}
              img={blog.img}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
