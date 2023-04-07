const express = require("express");
const {
  getallProducts,
  createProduct,
  updateProduct,
  deleleProduct,
  singleProduct,
} = require("../controllers/productController");
const { isAuthenticated, isAutherized } = require("../middleware/auth");
const router = express.Router();

router.get("/products", isAuthenticated, isAutherized("user"), getallProducts);
router.post("/new", isAuthenticated, createProduct);
router.put("/product/:id", isAuthenticated, updateProduct);
router.delete("/product/:id", isAuthenticated, deleleProduct);
router.get("/product/:id", singleProduct);
module.exports = router;
