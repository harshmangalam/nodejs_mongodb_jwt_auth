const jwt = require("jsonwebtoken");
const { JWT_DECODE_ERR } = require("../errors");
const { JWT_SECRET } = require("../config");

exports.createJwtToken = (payload) => {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
  return token;
};

exports.verifyJwtToken = (token, next) => {
  try {
    const { userId } = jwt.verify(token, JWT_SECRET);
    return userId;
  } catch (err) {
    next(err);
  }
};
