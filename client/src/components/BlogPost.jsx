import React from "react";
import { useNavigate } from "react-router-dom";

const BlogPost = ({ post }) => {
  const navigate = useNavigate();

  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <section
      className="shadow-lg bg-color-default shadow-black rounded-lg w-full flex flex-col gap-3 border-2 border-black p-5 cursor-pointer"
      onClick={() => navigate(`/post/${post._id}`)}
    >
      <img
        className="h-[30vh] md:h-[50vh] w-full rounded-lg shadow-lg object-cover object-center"
        src={post.picture ? post.picture : "/blog.avif"}
        alt="blog image"
      />

      <article className="flex flex-col gap-1 concert-one-regular ">
        <h1 className="text-3xl text-start">{post.title}</h1>
        <hr className="border-black mt-1" />
        <div className="text-xl">
          <h2 className="mt-2 w-fit ">{addEllipsis(post.description, 100)}</h2>
          <div className="flex flex-col gap-2">
            <span className="text-start">Author: {post.username}</span>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <img src="like.png" alt="Like" className="w-7 h-7 mt-1" />
                <span>{post.likes ? post.likes.length : 0}</span>
              </div>
              <span className="bg-color-navbar text-white rounded-2xl font-bold px-3 text-lg pb-2">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default BlogPost;
