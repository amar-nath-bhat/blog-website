import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import BlogPost from "../components/BlogPost";
import { API } from "../services/api";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { debounce } from "lodash";

const Blogs = ({ loading, setLoading }) => {
  const [posts, setPosts] = useState([]);
  const auth = useSelector((state) => state.auth);
  const debouncedSetLoading = useCallback(
    debounce((value) => setLoading(value), 300),
    [setLoading]
  );

  useEffect(() => {
    debouncedSetLoading(true);
    const fetchData = async () => {
      let res = await API.getAllPosts({ username: auth.username });
      if (res.isSuccess) {
        setPosts(res.data);
        debouncedSetLoading(false);
      }
    };
    fetchData();
  }, [debouncedSetLoading]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-5 md:px-10 pb-10 flex flex-col gap-5 md:gap-10">
      <section className="flex justify-center">
        <div className="mt-3 concert-one-regular uppercase absolute text-white flex flex-col justify-center items-center gap-3 ">
          <h1 className="text-[35px] md:text-[60px] text-deep-orange-400">
            Explore Blogs!
          </h1>
          <Link to="/create">
            <Button className="text-[15px] md:text-[20px] text-orange-300 concert-one-regular pb-4 md:pb-5">
              Create Your Own Blog
            </Button>
          </Link>
        </div>

        <img
          className="md:h-[60vh] h-[40vh] w-full rounded-b-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
          src="blog.avif"
          alt="blog image"
        />
      </section>
      <section className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-4xl concert-one-regular uppercase">Your Blogs</h1>
        <div className="w-full md:w-2/3 flex justify-between gap-5 md:gap-10">
          <SearchBar />
          <Filter />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 blog-post-content-font w-full">
          {posts?.length ? (
            posts.map((post, index) => (
              <div key={index}>
                <BlogPost post={post} />
              </div>
            ))
          ) : (
            <div className="text-center text-2xl text-red-500">
              No Blogs Found
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blogs;
