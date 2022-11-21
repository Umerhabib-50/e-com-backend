const Product = require("../Models/productModel");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apiFeatures");

// ---------------------create product function

const createProduct = catchAsyncErrors(async (req, res, next) => {
  // const newpro = new Product(req.body);
  // await newpro.save();
  // res.status(200).json(newpro);

  const product = await Product.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});

// ---------------------get all products function

const getAllproducts = catchAsyncErrors(async (req, res) => {
  const resultPerPage = 3;
  const productsCount = await Product.countDocuments();

  const apifeatures = new ApiFeatures(Product.find(), req.query)
    .search()
    .filter()
    .pagination(resultPerPage);

  const products = await apifeatures.query;

  res.status(200).json({ success: true, products, productsCount });
});

// ---------------------update product function

const updateProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  const updatedproduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  res.status(200).json({ success: true, updatedproduct });
});

// ---------------------delete product function

const deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("product not found", 404));
  }
  await product.remove();
  res.status(200).json({ success: true, massage: "product deleted" });
});

// ---------------------get single product detail function

const getProductdetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  // if (!product) {
  //   return res
  //     .status(500)
  //     .json({ success: false, massage: "product not found" });
  // }

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({ success: true, product });
});

module.exports = {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductdetails,
};
