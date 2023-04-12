const express = require("express");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  deleteOrder,
  updateOrder,
} = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticated, isAutherized } = require("../middleware/auth");

router.post("/order/new", isAuthenticated, newOrder);
router.route("/order/:id").get(isAuthenticated, getSingleOrder);
router.route("/orders/me").get(isAuthenticated, myOrders);
router.get("/orders/all", isAuthenticated, isAutherized("admin"), getAllOrders);

router.delete(
  "/orders/:id",
  isAuthenticated,
  isAutherized("admin"),
  deleteOrder
);

router.put("/order/:id", isAuthenticated, isAutherized("admin"), updateOrder);

module.exports = router;
