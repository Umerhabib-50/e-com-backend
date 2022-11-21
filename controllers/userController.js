const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../Models/userModel");
const bcrypt = require("bcrypt");
const sendToken = require("../utils/jwtToken");

const RegisterUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  //   const hashed_psd = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "this is sample id",
      url_id: "sampleurl",
    },
  });

  sendToken(newUser, 201, res);
});

// Login User
const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user, 201, res);
});

// Logout User
const logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

module.exports = { RegisterUser, loginUser, logout };
