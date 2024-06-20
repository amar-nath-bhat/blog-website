const Post = require("../models/post");

const createPost = async (request, response) => {
  try {
    const post = await new Post(request.body);
    const res = post.save();
    if (res) response.status(200).json("Post saved successfully");
    else response.status(500).json("Post not saved");
  } catch (error) {
    response.status(500).json(error);
  }
};

const updatePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).json({ msg: "Post not found" });
      return;
    }

    await Post.findByIdAndUpdate(request.params.id, { $set: request.body });

    response.status(200).json("post updated successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

const deletePost = async (request, response) => {
  try {
    const post = await Post.findByIdAndDelete(request.params.id);
    response.status(200).json("post deleted successfully");
  } catch (error) {
    response.status(500).json(error.msg);
  }
};

const getPost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    response.status(200).json(post);
  } catch (error) {
    response.status(500).json(error);
  }
};

const getAllPosts = async (request, response) => {
  let username = request.query.username;
  let category = request.query.category;
  let archived = request.query.archived;
  let posts;
  try {
    if (username) posts = await Post.find({ username: username });
    else if (category)
      posts = await Post.find({ category: category, archived: false });
    else if (archived) posts = await Post.find({ archived: true });
    else posts = await Post.find({ archived: false });

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};

const archivePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).json({ msg: "Post not found" });
    }

    await Post.findByIdAndUpdate(request.params.id, {
      $set: { archived: true },
    });

    response.status(200).json("post archived successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

const unArchivePost = async (request, response) => {
  try {
    const post = await Post.findById(request.params.id);

    if (!post) {
      response.status(404).json({ msg: "Post not found" });
      return;
    }

    await Post.findByIdAndUpdate(request.params.id, {
      $set: { archived: false },
    });

    response.status(200).json("post unarchived successfully");
  } catch (error) {
    response.status(500).json(error);
  }
};

const searchPosts = async (request, response) => {
  let search = request.query.search;
  if (!search || typeof search !== "string") {
    console.error("Invalid search term ", search);
    getAllPosts(request, response);
    return;
  }
  // console.log(search);
  try {
    let posts = await Post.find(
      {
        $text: { $search: search },
        archived: false,
      },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    response.status(200).json(posts);
  } catch (error) {
    response.status(500).json(error);
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getPost,
  getAllPosts,
  archivePost,
  unArchivePost,
  searchPosts,
};
