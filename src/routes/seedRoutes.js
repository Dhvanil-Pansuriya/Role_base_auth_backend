// src/routes/seedRoutes.js
import express from "express";
import Permission from "../models/permission.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import authorizeRole from "../middlewares/roleMiddlewares.js";
import seedUsers from "../seeders/userSeeder.js";

const router = express.Router();

const defaultPermissions = [
  {
    name: "create_user",
    description: "Create new users",
    rolePermissions: ["admin"],
  },
  {
    name: "update_user",
    description: "Update users",
    rolePermissions: ["admin", "staff"],
  },
  {
    name: "update_user_limited",
    description: "Update limited user fields",
    rolePermissions: ["staff"],
  },
  {
    name: "delete_user",
    description: "Delete users",
    rolePermissions: ["admin"],
  },
  {
    name: "view_users",
    description: "View all users",
    rolePermissions: ["admin"],
  },
  {
    name: "view_self",
    description: "View own profile",
    rolePermissions: ["user"],
  },
];

router.post(
  "/seed-permissions",
  verifyToken,
  authorizeRole("admin"),
  async (req, res) => {
    try {
      await Permission.deleteMany({});
      const permissions = await Permission.insertMany(defaultPermissions);
      successResponse(
        res,
        permissions,
        "Default permissions seeded successfully"
      );
    } catch (err) {
      errorResponse(res, `Error: ${err.message}`, 500);
    }
    // seedUsers();
  }
);

export default router;
