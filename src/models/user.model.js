const { model, Schema } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    bio: {
      type: String,
      trim: true,
    },

    profilePic: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
