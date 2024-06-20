import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const BlogPost = ({ post }) => {
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [likeState, setLikeState] = useState(false);
  const onLikeClick = (e) => {
    // likes = likeState ? likes - 1 : likes + 1;
    if (likeState) e.target.src = "like.png";
    else e.target.src = "liked.png";
    setLikeState(!likeState);
  };
  const addEllipsis = (str, limit) => {
    return str.length > limit ? str.substring(0, limit) + "..." : str;
  };

  return (
    <section
      className="shadow-lg bg-color-default shadow-black rounded-lg w-full flex flex-col gap-3 border-2 border-black p-5 cursor-pointer"
      onClick={() => navigate(`/post/${post._id}`)}
    >
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
      <div className="flex flex-col gap-1 concert-one-regular">
        <h1 className="text-3xl">{post.title}</h1>
        <hr className="border-black mt-1" />
        <div className="text-xl">
          <h2 className="mt-2 w-fit ">{addEllipsis(post.description, 100)}</h2>
          <div className="flex flex-col gap-2">
            <span>Author: {post.username}</span>
            <div className="flex items-center justify-between">
              <div className="flex gap-1">
                <img
                  src="like.png"
                  alt="Like"
                  className="w-7 h-7 cursor-pointer mt-1"
                  onClick={(e) => onLikeClick(e)}
                />
                <span>10</span>
              </div>
              <span className="bg-color-navbar text-white rounded-2xl font-bold px-3 text-lg pb-2">
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
