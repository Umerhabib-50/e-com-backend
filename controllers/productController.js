const Product = require("../Models/productModel");

const createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json({ success: true, product });
};

const getallProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({ success: true, products });
};

const updateProduct = async (req, res) => {
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
};

module.exports = { getallProducts, createProduct, updateProduct };
