const mongoose = require("mongoose");
const grid_stream = require("gridfs-stream");

const url = "https://fouxy-blogging.vercel.app/";
// const url = "http://localhost:5000";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid_stream(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

const uploadImage = (request, response) => {
  if (!request.file) {
    return response
      .status(400)
      .json({ isSuccess: false, msg: "No file found." });
  }

  const imageUrl = `${url}/file/${request.file.filename}`;
  response.status(200).json({ isSuccess: true, imageUrl });
};

const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });

    if (!file || !file.length) {
      return response
        .status(404)
        .json({ isSuccess: false, msg: "File not found." });
    }

    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.on("error", (error) => {
      return response
        .status(500)
        .json({ isSuccess: false, msg: error.message });
    });

    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ isSuccess: false, msg: error.message });
  }
};

module.exports = { uploadImage, getImage };
