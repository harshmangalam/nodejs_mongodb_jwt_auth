const bcrypt = require("bcrypt");

exports.checkPassword = async (password, hashedPassword, next) => {
  try {
    const matchPassword = await bcrypt.compare(password, hashedPassword);
    return matchPassword;
  } catch (err) {
    next(error);
  }
};

exports.hashPassword = async (password, next) => {
  try {
    const hashed = await bcrypt.hash(password, 6);
    return hashed;
  } catch (error) {
    next(error);
  }
};
