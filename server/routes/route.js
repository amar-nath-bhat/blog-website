const express = require("express");
const user_controller = require("../controller/user-controller");
const post_controller = require("../controller/post-controller");
const image_controller = require("../controller/image-controller");
const jwt_controller = require("../controller/jwt-controller");
const upload = require("../utils/upload");

const router = express.Router();

router.post("/signup", user_controller.signupUser);
router.post("/login", user_controller.loginUser);
router.post("/logout", user_controller.logoutUser);

router.post(
  "/create",
  jwt_controller.authenticateToken,
  post_controller.createPost
);
router.delete(
  "/delete/:id",
  jwt_controller.authenticateToken,
  post_controller.deletePost
);
router.put(
  "/update/:id",
  jwt_controller.authenticateToken,
  post_controller.updatePost
);

router.get(
  "/post/:id",
  jwt_controller.authenticateToken,
  post_controller.getPost
);
router.get("/posts", post_controller.getAllPosts);

router.post(
  "/file/upload",
  upload.single("file"),
  image_controller.uploadImage
);

router.get("/file/:filename", image_controller.getImage);

router.put(
  "/archive/:id",
  jwt_controller.authenticateToken,
  post_controller.archivePost
);

router.put(
  "/unarchive/:id",
  jwt_controller.authenticateToken,
  post_controller.unArchivePost
);

router.get("/search", post_controller.searchPosts);

router.put("/like", jwt_controller.authenticateToken, post_controller.likePost);

router.post("/token", jwt_controller.createNewToken);

module.exports = router;
