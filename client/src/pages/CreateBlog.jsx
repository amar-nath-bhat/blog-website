import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { categories } from "../constants/data";
import { API } from "../services/api";
import { useSelector } from "react-redux";
import DialogDefault from "../components/Dialog";
import toast, { Toaster } from "react-hot-toast";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "All",
  createdDate: new Date(),
  likes: [],
  archived: false,
};

const CreateBlog = () => {
  const navigate = useNavigate();
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const auth = useSelector((state) => state.auth);

  const url_image = file ? URL.createObjectURL(file) : "blog.avif";

  useEffect(() => {
    const getImage = async () => {
      try {
        if (file) {
          const data = new FormData();
          data.append("name", file.name);
          data.append("file", file);

          const response = await API.uploadImage(data);
          if (response.data.isSuccess) {
            post.picture = response.data.imageUrl;
            console.log(post.picture);
            toast.success("Image uploaded successfully");
          } else toast.error("Failed to upload image");
        }
      } catch (e) {
        console.log(e);
      }
    };
    getImage();
    post.username = auth.username;
    // console.log(post);
  }, [file]);

  const savePost = async () => {
    let response = await API.createPost(post);
    console.log(response);
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
    // console.log(post);
  };

  return (
    <div className="px-5 md:px-10 flex flex-col gap-10 pb-10 ">
      <section className="flex justify-center">
        <div className="mt-3  uppercase absolute text-white flex flex-col justify-center items-center gap-3 concert-one-regular">
          <h1 className="text-[35px] md:text-[60px] text-deep-orange-400">
            Start Blogging !
          </h1>
          <Link to="/blogs">
            <Button className="text-[15px] md:text-[20px] text-orange-300 pb-5 md:pb-5 concert-one-regular">
              View Blogs
            </Button>
          </Link>
        </div>

        <img
          className="md:h-[60vh] h-[40vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
          src={url_image}
          alt="blog image"
        />
      </section>
      <section className="flex flex-col gap-10 justify-evenly bg-color-default p-10 rounded-lg shadow-blue-gray-900/50 shadow-xl border-2 border-black">
        <div className="flex gap-10 flex-col md:flex-row md:justify-center md:items-center">
          <div className="flex flex-row justify-center items-center gap-5 md:w-2/3">
            <Button className="bg-transparent p-0 " title="Add Image">
              <label htmlFor="fileInput" className="cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="40"
                  height="40"
                  viewBox="0 0 50 50"
                >
                  <path d="M25,2C12.317,2,2,12.317,2,25s10.317,23,23,23s23-10.317,23-23S37.683,2,25,2z M37,26H26v11h-2V26H13v-2h11V13h2v11h11V26z"></path>
                </svg>
              </label>
            </Button>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            <input
              type="text"
              placeholder="Title"
              name="title"
              className="w-full py-2 px-3 rounded-lg text-xl md:text-2xl border-2 border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-300 bg-[#fda179]"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <select
            placeholder="Select Category"
            size="lg"
            name="category"
            className="px-3 py-2 text-xl md:text-2xl rounded-lg w-full md:w-1/3 bg-[#fda179] focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-black"
            onChange={(e) => handleChange(e)}
          >
            {categories.map((category, index) => (
              <option key={index}>{category.type}</option>
            ))}
          </select>
          <DialogDefault
            handler={savePost}
            body="Publish"
            className="pb-4 px-4"
          >
            Publish
          </DialogDefault>
        </div>
        <textarea
          placeholder="Write your blog...."
          rows={5}
          className="p-5 text-xl rounded-lg border-2 border-black placeholder-black bg-[#fda179]"
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </section>
    </div>
  );
};

export default CreateBlog;
