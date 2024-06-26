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
  // console.log(request);

  if (!request.file)
    return response.status(404).json({ msg: "No file found." });

  const imageUrl = `${url}/file/${request.file.filename}`;

  response.status(200).json(imageUrl);
};

const getImage = async (request, response) => {
  try {
    const file = await gfs.files.findOne({ filename: request.params.filename });
    // const readStream = gfs.createReadStream(file.filename);
    // readStream.pipe(response);
    const readStream = gridfsBucket.openDownloadStream(file._id);
    readStream.pipe(response);
  } catch (error) {
    response.status(500).json({ msg: error.message });
  }
};

module.exports = { uploadImage, getImage };
