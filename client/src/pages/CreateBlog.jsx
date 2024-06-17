import React from "react";
import { Button } from "@material-tailwind/react";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { DataContext } from "../context/DataProvider";
import { categories } from "../constants/data";
import { API } from "../services/api";

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

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const { account } = useContext(DataContext);

  const url_image = file ? URL.createObjectURL(file) : "blog.avif";

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        // console.log(file);
        data.append("file", file);
        // console.log(data);
        try {
          // console.log("Uploading file:", file);
          // for (let pair of data.entries()) {
          //   console.log(pair[0] + ", " + pair[1]);
          // }
          const response = await API.uploadImage(data);

          post.picture = response.data;
        } catch (e) {
          console.log(e);
        }
      }
    };
    getImage();
    post.username = account.username;
  }, [file]);

  const savePost = async () => {
    let response = await API.createPost(post);
    console.log(response);
    navigate("/");
  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  return (
    <div className="px-5 md:px-10 flex flex-col gap-10 pb-10 concert-one-regular">
      <section className="flex justify-center">
        <div className="mt-3 concert-one-regular uppercase absolute text-white flex flex-col justify-center items-center gap-3 ">
          <h1 className="text-[35px] md:text-[60px] text-deep-orange-400">
            Start Blogging !
          </h1>
          <Link to="/blogs">
            <Button className="text-[15px] md:text-[20px] text-orange-300 concert-one-regular pb-4 md:pb-5">
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
              className="w-full pb-3 px-3 rounded-lg text-2xl bg-color-default border-2 border-black placeholder-black"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <select
            placeholder="Select Category"
            size="lg"
            name="category"
            className="py-2 pb-3 px-3 text-2xl rounded-lg w-full md:w-1/3 bg-color-default border-2 border-black"
            onChange={(e) => handleChange(e)}
          >
            {categories.map((category, index) => (
              <option key={index}>{category.type}</option>
            ))}
          </select>
          <button
            onClick={() => savePost()}
            className="bg-black text-white font-extrabold px-5 rounded-xl pb-3 text-2xl"
          >
            Publish
          </button>
        </div>
        <textarea
          placeholder="Write your blog...."
          rows={5}
          className="p-5 text-xl rounded-lg bg-color-default border-2 border-black placeholder-black"
          name="description"
          onChange={(e) => handleChange(e)}
        />
      </section>
    </div>
  );
};

export default CreateBlog;
