const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters long"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: [
        (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        "Please enter a valid email",
      ],
      minlength: [3, "Email must be at least 3 characters long"],
    },
    
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      minlength: [3, "First name must be at least 3 characters long"],
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      minlength: [3, "Last name must be at least 3 characters long"],
    },
    refresh_token: String
  },
  {
    virtuals: {
      full_name: {
        get() {
          return this.first_name + " " + this.last_name;
        },
      },
      id: {
        get() {
          return this._id
        },
      }
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
