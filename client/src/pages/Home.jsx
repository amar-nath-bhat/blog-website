import BlogPost from "../components/BlogPost";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useState, useEffect, useCallback } from "react";
import { API } from "../services/api";
import SearchBar from "../components/SearchBar";
import Filter from "../components/Filter";
import { useSelector } from "react-redux";
import Loading from "../components/Loading";
import { debounce } from "lodash";
import Hero from "../components/Hero";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useSelector((state) => state.auth);

  const sortLikes = (a, b) => {
    if (a.likes === undefined) a.likes = [];
    if (b.likes === undefined) b.likes = [];
    return b.likes.length - a.likes.length;
  };

  const debouncedSetLoading = useCallback(
    debounce((value) => setLoading(value), 300),
    [setLoading]
  );

  useEffect(() => {
    debouncedSetLoading(true);
    const fetchData = async () => {
      let res = await API.getAllPosts();
      console.log(res);
      if (res.data.isSuccess) {
        setPosts(res.data.posts.sort((a, b) => sortLikes(a, b)));
        debouncedSetLoading(false);
      }
    };
    fetchData();
  }, [debouncedSetLoading]);

  const searchPosts = async (search) => {
    debouncedSetLoading(true);
    let res;
    res = await API.searchPosts({ search: search });
    if (res.data.isSuccess) {
      setPosts(res.data.posts);
      debouncedSetLoading(false);
    }
  };

  const searchCategory = async (category) => {
    debouncedSetLoading(true);
    let res;
    res = await API.getAllPosts({ category: category, archived: false });
    if (res.data.isSuccess) {
      setPosts(res.data.posts);
      debouncedSetLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="px-5 md:px-10 pb-10 flex flex-col gap-5 md:gap-10">
      <Hero
        title={`Welcome ${auth.status ? auth.name : " to Fouxy"}`}
        subTitle={"Start Blogging"}
        url_image={"/blog.avif"}
      />
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
