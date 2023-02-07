const User = require("../Models/UserModal");
const { generateToken } = require("../utils/generateToken");
const asyncHandler = require("express-async-handler");

// @des      Auth user and get token
// @route    POST/api/v1/users/login
// @access   Public

const authUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      throw "invalid email or password";
    }
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};

// @des      Register a new user
// @route    POST/api/v1/users/login
// @access   Public

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(404);
      throw new Error("Invalid user data");
    }
  } catch (error) {
    res.status(401).send(error);
    console.log(error);
  }
};

// @des      get users profile
// @route    GET/api/v1/users/profile
// @access   Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(verifiedUser._id); //midleware pass korle verifiedUseer._id pabe

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

module.exports = { authUser, getUserProfile, registerUser };
