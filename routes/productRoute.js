const express = require("express");
const {
  getAllproducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductdetails,
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// router.get("/products", getAllproducts);

router
  .route("/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllproducts);
router.route("/product/new").post(createProduct);
router
  .route("/product/:id")
  .put(isAuthenticatedUser, updateProduct)
  .delete(isAuthenticatedUser, deleteProduct)
  .get(getProductdetails);
// router.route("/product/:id").put(updateProduct)
// router.route("/product/:id").delete(deleteProduct);
module.exports = router;
