const express = require("express");
const {
  getallProducts,
  createProduct,
  updateProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/products", getallProducts);
router.post("/new", createProduct);
router.put("/product/:id", updateProduct);

module.exports = router;
