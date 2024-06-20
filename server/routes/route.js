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
router.get(
  "/posts",
  jwt_controller.authenticateToken,
  post_controller.getAllPosts
);

router.post(
  "/file/upload",
  upload.single("file"),
  image_controller.uploadImage
);
router.get("/file/:filename", image_controller.getImage);

module.exports = router;
