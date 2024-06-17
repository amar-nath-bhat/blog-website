import React from "react";
import { useState } from "react";

const BlogPost = ({ post }) => {
  const [likeState, setLikeState] = useState(false);
  const onLikeClick = (e) => {
    likes = likeState ? likes - 1 : likes + 1;
    if (likeState) e.target.src = "like.png";
    else e.target.src = "liked.png";
    setLikeState(!likeState);
  };
  return (
    <section className="shadow-lg bg-color-default shadow-black rounded-lg w-full flex flex-col gap-3 border-2 border-black p-5">
      {post.picture ? (
        <img
          className="h-[30vh] md:h-[50vh] w-full rounded-lg shadow-lg object-cover object-center"
          src={post.picture}
          alt="blog image"
        />
      ) : (
        <img
          className="h-[30vh] md:h-[50vh] w-full rounded-lg shadow-lg object-cover object-center"
          src="blog.avif"
          alt="blog image"
        />
      )}
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl">{post.title}</h1>
        <hr className="border-black mt-1" />
        <div className="blog-post-content-font text-xl">
          <h2 className="mt-2 w-fit ">{post.description}</h2>
          <div className="flex flex-col gap-2">
            <span>Author: {post.username}</span>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <img
                  src="like.png"
                  alt="Like"
                  className="w-7 h-7 cursor-pointer"
                  onClick={(e) => onLikeClick(e)}
                />
                <span>10</span>
              </div>
              <span className="bg-color-navbar text-white rounded-2xl font-bold px-3 shadow-md shadow-black text-lg">
                {post.category}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogPost;
