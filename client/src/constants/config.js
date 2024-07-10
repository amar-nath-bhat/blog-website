export const API_NOTIFICATION_MESSAGES = {
  loading: {
    title: "Loading...",
    message: "Data is being loaded. Please wait",
  },
  success: {
    title: "Success",
    message: "Data successfully loaded",
  },
  requestFailure: {
    title: "Error!",
    message: "An error occur while parsing request data",
  },
  responseFailure: {
    title: "Error!",
    message:
      "An error occur while fetching response from server. Please try again",
  },
  networkError: {
    title: "Error!",
    message:
      "Unable to connect to the server. Please check internet connectivity and try again.",
  },
};

export const SERVICE_URLS = {
  userLogin: { url: "/login", method: "POST" },
  userSignup: { url: "/signup", method: "POST" },
  uploadImage: { url: "/file/upload", method: "POST" },
  createPost: { url: "/create", method: "POST" },
  getAllPosts: { url: "/posts", method: "GET", params: true },
  getPostById: { url: "/post", method: "GET", query: true },
  deletePost: { url: "/delete", method: "DELETE", query: true },
  updatePost: { url: "/update", method: "PUT", query: true },
  archivePost: { url: "/archive", method: "PUT", query: true },
  unArchivePost: { url: "/unarchive", method: "PUT", query: true },
  archivePost: { url: "/archive", method: "PUT", query: true },
  getRefreshToken: { url: "/token", method: "POST" },
  searchPosts: { url: "/search", method: "GET", query: true },
  likePost: { url: "/like", method: "PUT", query: true, params: true },
  userLogout: { url: "/logout", method: "POST" },
};
