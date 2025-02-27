// src/middlewares/permissionMiddlewares.js
import Permission from "../models/permission.model.js";
import { errorResponse } from "../utils/apiResponse.js";

const hasPermission = (permissionName) => {
  return async (req, res, next) => {
    try {
      const userPermissions = await Permission.find({ user: req.user._id });
      const rolePermissions = await Permission.find({
        rolePermissions: req.user.role,
      });

      // Check if user has the permission either via role or individual permissions
      const hasRolePermission = rolePermissions.some(
        (p) => p.name === permissionName
      );
      const hasIndividualPermission = userPermissions.some(
        (p) => p.name === permissionName
      );

      if (!hasRolePermission && !hasIndividualPermission) {
        return errorResponse(res, "Permission denied", 403);
      }
      next();
    } catch (err) {
      errorResponse(res, `Error: ${err.message}`, 500);
    }
  };
};

export default hasPermission;