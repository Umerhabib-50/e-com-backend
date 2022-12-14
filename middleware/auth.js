const ErrorHandler = require("../utils/ErrorHandler");

const jwt = require("jsonwebtoken");

const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../Models/userModel");

const isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    // if (!roles.includes(req.user.role)) {
    if (req.user.role == "user") {
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

module.exports = { isAuthenticatedUser, authorizeRoles };
