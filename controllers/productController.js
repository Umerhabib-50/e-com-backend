const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../Models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

// ==========================create products

const createProduct = catchAsyncError(async (req, res) => {
  req.body.user = req.user.id;
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

//============================ get all products

const getallProducts = catchAsyncError(async (req, res) => {
  const resultPerpage = 5;
  const apiFeature = new ApiFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(resultPerpage);
  let products = await apiFeature.query;

  res.status(200).json({ success: true, products });
});

//================================= update product

const updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById({ _id: req.params.id });
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, product });
});

//================================= delete product

const deleleProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById({ _id: req.params.id });

  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();
  res.status(200).json({ success: true, msg: "Product deleted successfully" });
});

//================================= get single product

const singleProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById({ _id: req.params.id });
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

//====================== Create New Review or Update the review

const createProductReview = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;
  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

module.exports = {
  getallProducts,
  createProduct,
  updateProduct,
  deleleProduct,
  singleProduct,
  createProductReview,
};
