// src/routes/permissionRoutes.js
import express from "express";
import { verifyToken } from "../middlewares/authMiddlewares.js";
import authorizeRole from "../middlewares/roleMiddlewares.js";
import {
  createPermission,
  updatePermissionRoles,
  addRoleToPermission,
  removeRoleFromPermission,
  getAllPermissions,
  getPermissionById,
} from "../controller/permissionController.js";

const router = express.Router();

// Admin-only routes to manage permissions
router.post("/permissions", verifyToken, authorizeRole("admin"), createPermission);
router.put("/permissions/roles/:id", verifyToken, authorizeRole("admin"), updatePermissionRoles);
router.post("/permissions/add-role/:id", verifyToken, authorizeRole("admin"), addRoleToPermission);
router.post("/permissions/remove-role/:id", verifyToken, authorizeRole("admin"), removeRoleFromPermission);
router.get("/permissions", verifyToken, authorizeRole("admin"), getAllPermissions);
router.get("/permissions/:id", verifyToken, authorizeRole("admin"), getPermissionById);

export default router;