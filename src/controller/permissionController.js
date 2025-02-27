// src/controller/permissionController.js
import Permission from "../models/permission.model.js";
import { successResponse, errorResponse } from "../utils/apiResponse.js";

// Create a new permission
export const createPermission = async (req, res) => {
  const { name, description, rolePermissions } = req.body;
  try {
    let permission = await Permission.findOne({ name });
    if (permission) {
      return errorResponse(res, "Permission already exists", 400);
    }
    permission = new Permission({ name, description, rolePermissions });
    await permission.save();
    successResponse(res, permission, "Permission created successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

// Update roles assigned to a permission (add/remove)
export const updatePermissionRoles = async (req, res) => {
  const { id } = req.params;
  const { rolePermissions } = req.body; // Array of roles to set (e.g., ["admin", "staff"])
  try {
    const permission = await Permission.findById(id);
    if (!permission) {
      return errorResponse(res, "Permission not found", 404);
    }
    permission.rolePermissions = rolePermissions;
    await permission.save();
    successResponse(res, permission, "Permission roles updated successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

// Add a role to an existing permission
export const addRoleToPermission = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const permission = await Permission.findById(id);
    if (!permission) {
      return errorResponse(res, "Permission not found", 404);
    }
    if (permission.rolePermissions.includes(role)) {
      return errorResponse(res, "Role already assigned to this permission", 400);
    }
    permission.rolePermissions.push(role);
    await permission.save();
    successResponse(res, permission, "Role added to permission successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

// Remove a role from an existing permission
export const removeRoleFromPermission = async (req, res) => {
  const { id } = req.params;
  const { role } = req.body;
  try {
    const permission = await Permission.findById(id);
    if (!permission) {
      return errorResponse(res, "Permission not found", 404);
    }
    if (!permission.rolePermissions.includes(role)) {
      return errorResponse(res, "Role not assigned to this permission", 400);
    }
    permission.rolePermissions = permission.rolePermissions.filter(r => r !== role);
    await permission.save();
    successResponse(res, permission, "Role removed from permission successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

// Get all permissions
export const getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    successResponse(res, permissions, "Permissions fetched successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};

// Get a permission by ID
export const getPermissionById = async (req, res) => {
  const { id } = req.params;
  try {
    const permission = await Permission.findById(id);
    if (!permission) {
      return errorResponse(res, "Permission not found", 404);
    }
    successResponse(res, permission, "Permission fetched successfully");
  } catch (err) {
    errorResponse(res, `Error: ${err.message}`, 500);
  }
};