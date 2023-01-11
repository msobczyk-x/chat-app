const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please enter username"],
      unique: true,
    },
    email: {
      type: String,
      required: [false, "Please enter email address"],
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "Please enter password"],
    },
    dateOfBirth: {
      type: Date,
      required: [false, "Please enter date of birth"],
      // validate: {
      //   validator: function (value) {
      //     let date = new Date();
      //     // add validation function here
      //     date.setFullYear(date.getFullYear() - 16);
      //     return value < date;
      //   },
      //   message: "You must be at least 16 years old",
      // },
      min: "1900-01-01",
      max: "2022-12-31",
    },
    newUser: {
      type: Boolean,
      required: true,
    },
    hobby: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model("UserModel", userSchema);

module.exports = User;
