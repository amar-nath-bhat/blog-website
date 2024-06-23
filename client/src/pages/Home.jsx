import BlogPost from "../components/BlogPost";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { API } from "../services/api";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";

import { useSelector } from "react-redux";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const auth = useSelector((state) => state.auth);

  const sortLikes = (a, b) => {
    if (a.likes === undefined) a.likes = [];
    if (b.likes === undefined) b.likes = [];
    return b.likes.length - a.likes.length;
  };
  useEffect(() => {
    const fetchData = async () => {
      let res = await API.getAllPosts();
      if (res.isSuccess) setPosts(res.data.sort((a, b) => sortLikes(a, b)));
    };
    fetchData();
  }, []);

  const searchPosts = async (search) => {
    console.log(search);
    let res;
    res = await API.searchPosts({ search: search });
    if (res.isSuccess) setPosts(res.data);
  };

  const searchCategory = async (category) => {
    console.log(category);
    let res;
    res = await API.getAllPosts({ category: category, archived: false });
    if (res.isSuccess) setPosts(res.data);
  };

  return (
    <div className="px-5 md:px-10 pb-10 flex flex-col gap-5 md:gap-10">
      <section className="flex justify-center">
        <div className="mt-3 concert-one-regular uppercase absolute text-white flex flex-col justify-center items-center gap-3 ">
          <h1 className="text-[35px] md:text-[60px] text-deep-orange-400">
            Welcome {auth.status ? auth.name : " to Fouxy"}
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
        <div className="mt-3 md:mt-0 flex flex-col gap-5 justify-center items-center">
          <h1 className="text-4xl concert-one-regular uppercase">Top Blogs</h1>
          <div className="w-full flex flex-row justify-between md:gap-10 gap-5 items-center">
            <SearchBar searchHandle={searchPosts} />
            <Filter searchHandle={searchCategory} />
          </div>
          <div className="grid grid-cols-1 gap-10 blog-post-content-font w-full text-center">
            {posts.length ? (
              posts.map((post, index) => (
                <div key={index}>
                  <BlogPost post={post} />
                </div>
              ))
            ) : (
              <div className="text-red-500 text-4xl">No Posts Found</div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
