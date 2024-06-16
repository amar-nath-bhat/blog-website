import React from "react";
import { Link } from "react-router-dom";
import { useSearchParams } from "react-router-dom";

const Blogs = () => {
  return (
    <div>
      <h1>Blogs</h1>
      <Link to="/create">
        <button>Create</button>
      </Link>
    </div>
  );
};

export default Blogs;
