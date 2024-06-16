import React from "react";
import {
  Input,
  Button,
  Textarea,
  Select,
  Option,
} from "@material-tailwind/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { categories } from "../constants/data";

const initialPost = {
  title: "",
  description: "",
  picture: "",
  username: "",
  category: "",
  createdDate: new Date(),
};

const CreateBlog = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);
        post.picture = response.data;
      }
    };
    getImage();
    post.username = account.username;
  }, [file]);

  const savePost = async () => {
    await API.createPost(post);
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-10 flex flex-col gap-10 pb-10 ">
      <img
        className="h-[60vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
        src="blog.avif"
        alt="blog image"
      />
      <div className="flex flex-col gap-10 justify-evenly bg-color-default p-10 rounded-lg shadow-blue-gray-900/50 shadow-xl">
        <div className="flex gap-10 flex-row justify-center items-center">
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
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Input
            type="text"
            size="lg"
            label="Title"
            name="title"
            className="text-4xl"
            onChange={(e) => handleChange(e)}
          />
          <Select label="Select Category" size="lg">
            {categories.map((category, index) => (
              <Option key={index}>{category.type}</Option>
            ))}
          </Select>
          <button
            onClick={() => savePost()}
            className="bg-black text-white font-extrabold py-3 px-5 rounded-xl"
          >
            Publish
          </button>
        </div>
        <Textarea
          label="Write your blog...."
          rows={5}
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </div>
    </div>
  );
};

export default CreateBlog;
