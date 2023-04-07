const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("./catchAsyncError");

const isAuthenticated = catchAsyncError(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resourse", 401));
  }
  const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decodetoken.id);

  next();
});

const isAutherized = (...roles) => {
  console.log(roles);
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};

module.exports = { isAuthenticated, isAutherized };
