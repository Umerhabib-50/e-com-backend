const express = require("express");
const {
  getallProducts,
  createProduct,
  updateProduct,
  deleleProduct,
  singleProduct,
} = require("../controllers/productController");
const router = express.Router();

router.get("/products", getallProducts);
router.post("/new", createProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleleProduct);
router.get("/product/:id", singleProduct);
module.exports = router;
