import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { categories } from "../constants/data";
import { API } from "../services/api";
import DialogDefault from "../components/Dialog";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "All",
  createdDate: new Date(),
  likes: 0,
  archived: false,
};

const Update = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");

  const url_image = file
    ? URL.createObjectURL(file)
    : post.picture
    ? post.picture
    : "/blog-pic.webp";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadImage(data);
        if (response.isSuccess) {
          post.picture = response.data;
        }
      }
    };
    getImage();
  }, [file]);

  const updateBlogPost = async () => {
    await API.updatePost(post);
    navigate(`/post/${post._id}`);
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-5 md:px-10 flex flex-col gap-10 pb-10 ">
      <img
        className="md:h-[60vh] h-[40vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
        src={url_image}
        alt="blog image"
      />
      <section className="flex flex-col gap-10 justify-evenly bg-color-default p-10 rounded-lg shadow-blue-gray-900/50 shadow-xl border-2 border-black">
        <div className="flex gap-10 flex-col md:flex-row md:justify-center md:items-center">
          <div className="flex flex-row justify-center items-center gap-5 md:w-2/3">
            <label htmlFor="fileInput">
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
              value={post.title}
              className="w-full py-2 px-3 rounded-lg text-xl md:text-2xl border-2 border-black placeholder-black focus:outline-none focus:ring-2 focus:ring-blue-300 bg-[#fda179]"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <select
            placeholder="Select Category"
            size="lg"
            name="category"
            value={post.category}
            className="px-3 py-2 text-xl md:text-2xl rounded-lg w-full md:w-1/3 bg-[#fda179] focus:outline-none focus:ring-2 focus:ring-blue-300 border-2 border-black"
            onChange={(e) => handleChange(e)}
          >
            {categories.map((category, index) => (
              <option key={index}>{category.type}</option>
            ))}
          </select>
          <DialogDefault
            handler={updateBlogPost}
            body="Update"
            className="pb-4 px-4"
          >
            Update
          </DialogDefault>
        </div>
        <textarea
          value={post.description}
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

export default Update;
