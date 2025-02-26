import { errorResponse } from "../utils/apiResponse.js";

const authorizeRole = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(res, "Access Denied", 403);
    }
    next();
  };
};

export default authorizeRole;
