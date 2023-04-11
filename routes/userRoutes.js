const express = require("express");

const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassword,
  getUserdetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controllers/userController");
const { isAuthenticated, isAutherized } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/me", isAuthenticated, getUserdetails);
router.put("/password/update", isAuthenticated, updatePassword);
router.put("/me/update", isAuthenticated, updateProfile);
router.get("/admin/users", isAuthenticated, isAutherized("admin"), getAllUser);
router.get(
  "/admin/user/:id",
  isAuthenticated,
  isAutherized("admin"),
  getSingleUser
);
router.put(
  "/admin/user/:id",
  isAuthenticated,
  isAutherized("admin"),
  updateUserRole
);
router.delete(
  "/admin/user/:id",
  isAuthenticated,
  isAutherized("admin"),
  deleteUser
);
module.exports = router;
