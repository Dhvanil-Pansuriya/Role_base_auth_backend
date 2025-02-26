import jwt from "jsonwebtoken";
import { genSalt, hash, compare } from "bcryptjs";
import User from "../models/user.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

const signup = async (req, res) => {
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
    user = new User({
      name,
      email,
      password,
      gender,
      role,
    });
    const salt = await genSalt(10);
    user.password = await hash(password, salt);
    await user.save();
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "3h" },
      (err, token) => {
        if (err) throw err;
        successResponse(res, { token }, "User registered successfully");
      }
    );
  } catch (err) {
    errorResponse(res, `Error :${err.message}`, 500);
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, "Invalid credentials", 400);
    }
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 400);
    }
    const payload = {
      user: {
        id: user.id,
        role: user.role,
      },
    };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        successResponse(res, { user, token }, "User signed in successfully");
      }
    );
  } catch (err) {
    errorResponse(res, `Error : ${err.message}`, 500);
  }
};

export { signup, signin };
