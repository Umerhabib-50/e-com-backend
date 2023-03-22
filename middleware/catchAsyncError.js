const catchAsyncError = (func) => {
  return async (req, res, next) => {
    // Promise.resolve(func(req, res, next)).catch(next);
    try {
      await func(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
module.exports = catchAsyncError;
