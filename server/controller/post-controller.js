const Post = require("../models/post");

const createPost = async (req, res) => {
  try {
    const post = new Post(req.body);
    const result = await post.save();
    if (result) {
      res.status(200).json({ isSuccess: true, msg: "Post saved successfully" });
    } else {
      res.status(500).json({ isSuccess: false, msg: "Post not saved" });
    }
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ isSuccess: false, msg: "Post not found" });
      return;
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: req.body });

    res.status(200).json({ isSuccess: true, msg: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(404).json({ isSuccess: false, msg: "Post not found" });
      return;
    }

    res.status(200).json({ isSuccess: true, msg: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ isSuccess: false, msg: "Post not found" });
      return;
    }

    res.status(200).json({ isSuccess: true, post });
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const getAllPosts = async (req, res) => {
  let { username, category, archived } = req.query;
  let posts;
  try {
    if (username) posts = await Post.find({ username });
    else if (category) posts = await Post.find({ category, archived: false });
    else if (archived) posts = await Post.find({ archived: true });
    else posts = await Post.find({ archived: false });

    res.status(200).json({ isSuccess: true, posts });
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const archivePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ isSuccess: false, msg: "Post not found" });
      return;
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: { archived: true } });

    res
      .status(200)
      .json({ isSuccess: true, msg: "Post archived successfully" });
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const unArchivePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(404).json({ isSuccess: false, msg: "Post not found" });
      return;
    }

    await Post.findByIdAndUpdate(req.params.id, { $set: { archived: false } });

    res
      .status(200)
      .json({ isSuccess: true, msg: "Post unarchived successfully" });
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const searchPosts = async (req, res) => {
  let search = req.query.search;
  let username = req.query.username;
  if (!search || typeof search !== "string") {
    getAllPosts(req, res);
    return;
  }

  try {
    let posts = await Post.find(
      {
        $text: { $search: search },
        archived: false,
      },
      { username: username },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    res.status(200).json({ isSuccess: true, posts });
  } catch (error) {
    res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.body.postId);
    const userId = req.body.userId;

    if (!post) {
      res.status(404).json({ isSuccess: false, msg: "Post not found" });
      return;
    }

    if (post.likes.includes(userId)) {
      post = await Post.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: userId },
      });
      return res.status(200).json({ isSuccess: true, msg: "Post unliked" });
    } else {
      post = await Post.findByIdAndUpdate(req.body.postId, {
        $push: { likes: userId },
      });
      return res.status(200).json({ isSuccess: true, msg: "Post liked" });
    }
  } catch (err) {
    res.status(500).json({ isSuccess: false, msg: err.message });
  }
};

const unlikePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const userId = req.query.userId;

    if (!post) {
      res.status(404).json({ isSuccess: false, msg: "Post not found" });
      return;
    }

    if (!post.likes.includes(userId)) {
      return res
        .status(400)
        .json({ isSuccess: false, msg: "Post has not yet been liked" });
    }

    post.likes.pull(userId);
    await post.save();
    res.status(200).json({ isSuccess: true, likes: post.likes });
  } catch (err) {
    res.status(500).json({ isSuccess: false, msg: err.message });
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
  likePost,
  unlikePost,
};
