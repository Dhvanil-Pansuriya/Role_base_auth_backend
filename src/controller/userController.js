import User from "../models/user.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { genSalt, hash } from "bcryptjs";

export const createUser = async (req, res) => {
  const { name, email, password, gender, role } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return errorResponse(
        res,
        "User already exists, use different email",
        400
      );
    }
    user = new User({ name, email, password, gender, role });
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
    successResponse(res, user, "User created successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, gender, role } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { name, email, gender, role },
      { new: true }
    );
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    successResponse(res, user, "User updated successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};


export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    successResponse(res, users, "Users fetched successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    successResponse(res, user, "User fetched successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    successResponse(res, user, "User deleted successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};