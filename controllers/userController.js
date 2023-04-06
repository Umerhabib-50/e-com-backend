const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../Models/userModel");
const ErrorHandler = require("../utils/errorHandler");
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
  res.status(200).json({ newUser, token });
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

  res.status(200).json({ user, token, msg: "user logged in successfully" });
});

module.exports = {
  registerUser,
  loginUser,
};
