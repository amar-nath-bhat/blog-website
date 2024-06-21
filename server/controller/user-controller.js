const User = require("../models/user");
const Token = require("../models/token");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const signupUser = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    if (req.body.password !== req.body.confirm_password) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    req.body.password = hashedPassword;

    const newUser = new User(req.body);
    await newUser.save();

    return res.status(200).json({ msg: "User created successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    // Check if username and password are provided in the request body
    if (!req.body.username || !req.body.password) {
      console.error("Username or password not provided");
      return res
        .status(400)
        .json({ msg: "Username and password are required" });
    }

    // Find the user by username
    let user = await User.findOne({ username: req.body.username });

    // If user not found, return an error
    if (!user) {
      console.error("User not found:", req.body.username);
      return res.status(400).json({ msg: "User not found" });
    }

    // Check if the password is defined
    if (!user.password) {
      console.error("Password is undefined for user:", req.body.username);
      return res.status(400).json({ msg: "Password is undefined" });
    }

    // Compare the provided password with the stored hash
    let match = await bcrypt.compare(req.body.password, user.password);

    if (match) {
      // Ensure user.toJSON() returns a valid object
      const userObj = user.toJSON();
      if (!userObj) {
        console.error("user.toJSON() returned undefined");
        return res.status(500).json({ msg: "Error processing user data" });
      }

      // Generate access token
      const accessToken = jwt.sign(userObj, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: "1h",
      });

      // Generate refresh token
      const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET);

      // Save the refresh token in the database
      const newToken = new Token({ token: refreshToken });
      // await newToken.save();

      // Return the tokens to the client
      return res.status(200).json({ accessToken, refreshToken, user: userObj });
    } else {
      console.error("Invalid password for user:", req.body.username);
      return res.status(400).json({ msg: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ msg: error.message });
  }
};

const logoutUser = async (request, response) => {
  const token = request.body.token;
  await Token.deleteOne({ token: token });

  response.status(204).json({ msg: "logout successfull" });
};

module.exports = { signupUser, loginUser, logoutUser };
