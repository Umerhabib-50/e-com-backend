const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../Models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendRes = require("../utils/sendRes");
const registerUser = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "samplepublicid",
      url: "sampleavatarurl",
    },
  });
  const token = newUser.getJWTToken();
  sendRes(newUser, 200, res);
});

const loginUser = catchAsyncError(async (req, res, next) => {
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

  const token = user.getJWTToken();

  sendRes(user, 200, res);
});

const logoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({ success: true, msg: "logged out" });
});

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
};
