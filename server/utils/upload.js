const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");
const dotenv = require("dotenv");

dotenv.config();
const storage = new GridFsStorage.GridFsStorage({
  url: process.env.MONGO_URI,
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];

    if (match.indexOf(file.mimeType) === -1)
      return `${Date.now()}-blog-${file.name}`;

    return {
      bucketName: "photos",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

module.exports = multer({ storage });
