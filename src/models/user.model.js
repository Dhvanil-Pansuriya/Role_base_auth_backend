import mongoose, { Schema, model } from "mongoose";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    role: {
      type: String,
      enum: ["admin", "staff", "user"],
      default: "user",
    },

  },
  {
    timestamps: true,
  }
);

const User = model("User", UserSchema);

export default User;
