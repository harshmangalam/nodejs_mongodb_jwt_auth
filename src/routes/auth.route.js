const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const { EMAIL_INCORRECT_ERR } = require("../errors");

const checkAuth = require("../middlewares/checkAuth");
const {
  fetchCurrentUser,
  loginUser,
  registerUser,
} = require("../controllers/auth.controller");

const loginValidation = [
  body("email").not().isEmpty().withMessage("email/phone must be required"),
  body("password").not().isEmpty().withMessage("Password must be required"),
];

const registerValidation = [
  body("name").not().isEmpty().withMessage("Name must be required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email address must be required")
    .isEmail()
    .withMessage(EMAIL_INCORRECT_ERR),
];

router.post("/register", registerValidation, registerUser);

router.post("/login", loginValidation, loginUser);

router.get("/me", checkAuth, fetchCurrentUser);

module.exports = router;
