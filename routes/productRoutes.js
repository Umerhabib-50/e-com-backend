const express = require("express");
const {
  getallProducts,
  createProduct,
  updateProduct,
  deleleProduct,
  singleProduct,
  createProductReview,
  getProductReviews,
  deleteReview,
} = require("../controllers/productController");
const { isAuthenticated, isAutherized } = require("../middleware/auth");
const router = express.Router();

router.get("/products", getallProducts);
router.post(
  "/admin/new",
  isAuthenticated,
  isAutherized("admin"),
  createProduct
);
router.put(
  "/admin/product/:id",
  isAuthenticated,
  isAutherized("admin"),
  updateProduct
);
router.delete(
  "/admin/product/:id",
  isAuthenticated,
  isAutherized("admin"),
  deleleProduct
);
router.get("/product/:id", singleProduct);

router.put("/product/review", isAuthenticated, createProductReview);

router.get("/reviews", getProductReviews);
router.delete("/reviews", deleteReview);
module.exports = router;
