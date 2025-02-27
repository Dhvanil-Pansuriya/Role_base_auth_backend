// middlewares/authMiddleware.js
import jwt, { decode } from "jsonwebtoken";
import { errorResponse } from "../utils/apiResponse.js";

// const verifyToken = (req, res, next) => {
//   const authHeader = req.header("Authorization");
//   if (!authHeader) return errorResponse(res, "Access Denied", 401);

//   const token = authHeader.split(" ")[1];
//   if (!token) return errorResponse(res, "Access Denied", 401);

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     req.user = decode(token);
//     console.log(req,user);

//     next();
//   } catch (err) {
//     errorResponse(res, "Invalid Token", 400);
//   }
// };

const verifyToken = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return errorResponse(res, "No token, authorization denied", 401);
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    
    // Optional: If you want to always get fresh permissions, uncomment this
    // const user = await User.findById(req.user.id).populate('permissions');
    // req.user.permissions = user.permissions.map(p => p._id);
    
    next();
  } catch (err) {
    return errorResponse(res, "Token is not valid", 401);
  }
};


export { verifyToken };
