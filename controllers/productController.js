const catchAsyncError = require("../middleware/catchAsyncError");
const Product = require("../Models/productModel");
const ApiFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");

const createProduct = catchAsyncError(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
});

const getallProducts = catchAsyncError(async (req, res) => {
  const apifeature = new ApiFeatures(Product, req.query).search();
  // const products = await Product.find();

  const apiFeature = new ApiFeatures(Product.find(), req.query).search();
  let products = await apiFeature.query;

  res.status(200).json({ success: true, products });
});

const updateProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById({ _id: req.params.id });
  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }
  product = await Product.findByIdAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
  });
  res.status(200).json({ success: true, product });
});

const deleleProduct = catchAsyncError(async (req, res) => {
  let product = await Product.findById({ _id: req.params.id });

  if (!product) {
    return res
      .status(500)
      .json({ success: false, message: "product not found" });
  }
  await product.remove();
  res.status(200).json({ success: true, msg: "Product deleted successfully" });
});

const singleProduct = catchAsyncError(async (req, res, next) => {
  let product = await Product.findById({ _id: req.params.id });
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
    // res
    //   .status(500)
    //   .json({ success: false, message: "product not found" });
  }

  res.status(200).json({ success: true, product });
});

module.exports = {
  getallProducts,
  createProduct,
  updateProduct,
  deleleProduct,
  singleProduct,
};
