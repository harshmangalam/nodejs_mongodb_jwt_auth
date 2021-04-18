const User = require("../models/user.model");
const { validationResult } = require("express-validator");
const {
  INVALID_CREDENTIAL_ERR,
  EMAIL_ALREADY_EXISTS_ERR,
} = require("../errors");

const { checkPassword, hashPassword } = require("../utils/password.util");
const { createJwtToken } = require("../utils/token.util");

// ------------------------- login with username ------------------------------

exports.loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({ status: 422, message: "user input error", data: errors.mapped() });
      return;
    }

    const { email, password } = req.body;

    // verify email

    const user = await User.findOne({ email });
    if (!user) {
      next({ status: 400, message: INVALID_CREDENTIAL_ERR });
      return;
    }

    // verify password

    const matchPassword = await checkPassword(password, user.password, next);
    if (!matchPassword) {
      next({ status: 400, message: INVALID_CREDENTIAL_ERR });
      return;
    }

    // send jwt token

    const token = createJwtToken({ userId: user._id });

    res.status(201).json({
      type: "success",
      message: "You have loggedin successfully",
      data: {
        token,
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------------- create new user ---------------------------------

exports.registerUser = async (req, res, next) => {
  try {
    let { email, password, name } = req.body;

    // check duplicate email
    const emailExist = await User.findOne({ email });

    if (emailExist) {
      next({ status: 400, message: EMAIL_ALREADY_EXISTS_ERR });
      return;
    }

    // hash password

    password = await hashPassword(password, next);

    // create new user
    const createUser = new User({
      email,
      password,
      name,
    });

    // save user

    const user = await createUser.save();

    res.status(201).json({
      type: "success",
      message: "You have Registered successfully ",
      data: {
        userId: user._id,
      },
    });
  } catch (error) {
    next(error);
  }
};

// --------------- fetch current user -------------------------

exports.fetchCurrentUser = async (req, res, next) => {
  try {
    const currentUser = res.locals.user;
    return res.status(200).json({
      type: "success",
      message: "fetch current user",
      data: {
        user: currentUser,
      },
    });
  } catch (error) {
    next(error);
  }
};
