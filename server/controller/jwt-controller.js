const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Token = require("../models/token");

dotenv.config();

const authenticateToken = (request, response, next) => {
  const authHeader = request.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return response
      .status(401)
      .json({ isSuccess: false, msg: "Token is missing" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) {
      return response
        .status(403)
        .json({ isSuccess: false, msg: "Invalid token" });
    }

    request.user = user;
    next();
  });
};

const createNewToken = async (request, response) => {
  const refreshToken = request.body.token && request.body.token.split(" ")[1];

  if (!refreshToken) {
    return response
      .status(401)
      .json({ isSuccess: false, msg: "Refresh token is missing" });
  }

  try {
    const token = await Token.findOne({ token: refreshToken });

    if (!token) {
      return response
        .status(404)
        .json({ isSuccess: false, msg: "Refresh token is not valid" });
    }

    jwt.verify(token.token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
      if (error) {
        return response
          .status(403)
          .json({ isSuccess: false, msg: "Invalid refresh token" });
      }

      const accessToken = jwt.sign(user, process.env.ACCESS_SECRET_KEY, {
        expiresIn: "15m",
      });

      return response.status(200).json({ isSuccess: true, accessToken });
    });
  } catch (error) {
    response.status(500).json({ isSuccess: false, msg: "Server error" });
  }
};

module.exports = { authenticateToken, createNewToken };
