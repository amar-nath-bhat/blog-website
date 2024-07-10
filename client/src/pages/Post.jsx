import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { API } from "../services/api";
import { useState, useEffect } from "react";
import DialogDefault from "../components/Dialog";
import toast, { Toaster } from "react-hot-toast";

const likeInitialValue = {
  postId: "",
  userId: "",
};

const Post = () => {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);
  // const like = useSelector((state) => state.like);

  const navigate = useNavigate();
  const [post, setPost] = useState({});
  const initialLikeState = post.likes
    ? post.likes.includes(auth.userId)
    : false;
  console.log(initialLikeState);
  const [likeState, setLikeState] = useState(initialLikeState);
  const [like, setLike] = useState(likeInitialValue);
  const [likeCount, setLikeCount] = useState(0);
  const date = new Date(post.createdDate).toDateString();

  useEffect(() => {
    const fetchData = async () => {
      let res = await API.getPostById(id);
      if (res.data.isSuccess) {
        setPost(res.data.post);
        setLikeCount(res.data.post.likes ? res.data.post.likes.length : 0);
      } else {
        toast.error("Failed to fetch post");
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    await API.deletePost(post._id);
    navigate("/");
  };

  const handleUpdate = () => {
    navigate(`/update/${post._id}`);
  };

  const handleArchive = async () => {
    let response = await API.archivePost(post._id);
    if (response.data.isSuccess) {
      toast.success("Post archived successfully");
    } else {
      toast.error("Failed to archive post");
    }
    navigate("/");
  };

  const handleUnArchive = async () => {
    await API.unArchivePost(post._id);
    navigate("/");
  };

  const handleLike = async (e) => {
    setLike({ postId: post._id, userId: auth.userId });

    try {
      let res = await API.likePost(like);
      if (res.isSuccess) {
        setLikeState(!likeState);
        setLikeCount(likeState ? likeCount - 1 : likeCount + 1);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="px-5 md:px-10 pb-10 flex flex-col gap-5 md:gap-10">
      <Toaster />

      <img
        className="md:h-[60vh] h-[40vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
        src={post.picture ? post.picture : "/blog.avif"}
        alt="blog image"
      />
      <section className="flex flex-col gap-2 md:gap-5 justify-center concert-one-regular bg-color-default p-5 md:p-10 rounded-lg shadow-lg shadow-blue-gray-900/50 border-2 border-black h-full">
        <div className="flex flex-col md:flex-row items-center justify-between md:gap-10 gap-3">
          <div className="flex md:justify-start justify-between gap-10 md:w-1/2 items-center w-full">
            <h1 className="text-5xl ">{post.title}</h1>
            {post.archived && (
              <span className="bg-red-300 text-black rounded-lg py-2 px-3 pb-3 mt-3">
                Archived
              </span>
            )}
          </div>
          <div className="flex gap-5 md:gap-10 items-center justify-evenly md:w-1/2">
            <h2 className="text-xl">Posted on: {date}</h2>
            {auth.username === post.username && (
              <>
                <DialogDefault handler={handleDelete} body="Delete">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 md:size-6 "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                    />
                  </svg>
                </DialogDefault>
                <button
                  className="rounded-full concert-one-regular text-white bg-black p-2 focus:outline-none focus:ring-2 focus:ring-blue-300 text-lg md:text-2xl"
                  onClick={() => handleUpdate()}
                  title="Update"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="md:size-5 size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
                {post.archived ? (
                  <DialogDefault handler={handleUnArchive} body="Un-Archive">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </DialogDefault>
                ) : (
                  <DialogDefault handler={handleArchive} body="Archive">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="md:size-5 size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0-3-3m3 3 3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
                      />
                    </svg>
                  </DialogDefault>
                )}
              </>
            )}
          </div>
        </div>
        <hr className="border-black border-2" />
        <div className="flex justify-between w-full">
          <span className="text-lg">
            Author: {post.username ? post.username : "Unknown"}
          </span>
          <span className="text-lg">
            Category: {post.category ? post.category : "All Blogs"}
          </span>
          <div className="flex gap-1 flex-wrap">
            <img
              src={likeState ? "/liked.png" : "/like.png"}
              alt="Like"
              className="w-7 h-7 cursor-pointer"
              onClick={(e) => handleLike(e)}
            />
            <span>{likeCount}</span>
          </div>
        </div>
        <hr className="border-black" />
        <div className="text-lg md:text-3xl h-full w-full text-wrap">
          {post.description}
        </div>
      </section>
    </div>
  );
};

export default Post;
