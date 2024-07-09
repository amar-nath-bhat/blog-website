const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signupUser = async (req, res) => {
  try {
    if (req.body.password !== req.body.confirm_password) {
      return res
        .status(400)
        .json({ isSuccess: false, msg: "Passwords do not match" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    return res
      .status(200)
      .json({ isSuccess: true, msg: "User created successfully" });
  } catch (err) {
    if (err.code === 11000) {
      return res
        .status(400)
        .json({ isSuccess: false, msg: "Username already exists" });
    } else if (err.name === "ValidationError") {
      const errorMessages = Object.values(err.errors).map(
        (error) => error.message
      );
      return res
        .status(400)
        .json({ isSuccess: false, msg: errorMessages.join(", ") });
    }
    return res.status(500).json({ isSuccess: false, msg: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    if (!req.body.username || !req.body.password) {
      return res
        .status(400)
        .json({ isSuccess: false, msg: "Username and password are required" });
    }

    let user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(400).json({ isSuccess: false, msg: "User not found" });
    }

    let match = await bcrypt.compare(req.body.password, user.password);
    if (!match) {
      return res
        .status(400)
        .json({ isSuccess: false, msg: "Invalid password" });
    }

    const userObj = user.toJSON();

    // Generate access token
    const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });

    // Generate refresh token
    const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET);

    // Save the refresh token in the database
    const newToken = new Token({ token: refreshToken });
    await newToken.save();

    // Return the tokens to the client
    return res
      .status(200)
      .json({ isSuccess: true, accessToken, refreshToken, user: userObj });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const token = req.body.token;
    await Token.deleteOne({ token: token });

    return res.status(204).json({ isSuccess: true, msg: "Logout successful" });
  } catch (error) {
    return res.status(500).json({ isSuccess: false, msg: error.message });
  }
};

module.exports = { signupUser, loginUser, logoutUser };
