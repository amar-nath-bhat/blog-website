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
import toast, { Toaster } from "react-hot-toast";
import Hero from "../components/Hero";

const Blogs = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);
  const debouncedSetLoading = useCallback(
    debounce((value) => setLoading(value), 300),
    [setLoading]
  );

  useEffect(() => {
    debouncedSetLoading(true);
    const fetchData = async () => {
      let res = await API.getAllPosts({ username: auth.username });
      if (res.data.isSuccess) {
        setPosts(res.data.posts);
        debouncedSetLoading(false);
      }
    };
    fetchData();
  }, [debouncedSetLoading]);

  // const searchPosts = async (search) => {
  //   debouncedSetLoading(true);
  //   let res;
  //   res = await API.searchPosts({ username: auth.username, search: search });
  //   if (res.data.isSuccess) {
  //     setPosts(res.data.posts);
  //     debouncedSetLoading(false);
  //   }
  // };

  // const searchCategory = async (category) => {
  //   debouncedSetLoading(true);
  //   let res;
  //   res = await API.getAllPosts({
  //     username: auth.username,
  //     category: category,
  //     archived: false,
  //   });
  //   if (res.data.isSuccess) {
  //     setPosts(res.data.posts);
  //     debouncedSetLoading(false);
  //   }
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-5 md:px-10 pb-10 flex flex-col gap-5 md:gap-10">
      <Toaster />

      <Hero
        title={"Explore Blogs!"}
        subTitle={"Create Your Own Blog"}
        url_image={"/banner.webp"}
      />
      <section className="flex flex-col gap-10 justify-center items-center">
        <h1 className="text-4xl concert-one-regular uppercase">Your Blogs</h1>
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
