const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "plz enter your name"],
    maxLength: [40, "name cannot be more than 40 characters long"],
    minLength: [4, "name should be atleast 4 characters long"],
  },
  email: {
    type: String,
    required: [true, "plz enter email"],
    unique: true,
    validate: [validator.isEmail, "plz enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "plz enter password"],
    minLength: [4, "password should be atleast 4 characters long"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url_id: {
      type: String,
      required: true,
    },
  },

  role: {
    type: String,
    default: "user",
  },
  resetPasswordtoken: String,
  resetPasswordexpire: Date,
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  } else {
    next();
  }
});

// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) {
//       next();
//     }

//     this.password = await bcrypt.hash(this.password, 10);
//   });

// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
