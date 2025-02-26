import express from "express";
import { successResponse } from "../utils/apiResponse.js";
import {verifyToken} from "../middlewares/authMiddlewares.js";
import authorizeRole from "../middlewares/roleMiddlewares.js";
import {
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    deleteUser,
} from "../controller/userController.js";


const router = express.Router();

// Test APIs
router.get("/admin", verifyToken, authorizeRole("admin"), (req, res) => {
    successResponse(res, "Admin Login successfully", req.user);
});
router.get("/staff", verifyToken, authorizeRole("admin", "staff"),(req, res) => {
    successResponse(res, "Staff Login successfully", req.user);
});
router.get("/user",verifyToken, authorizeRole("admin", "staff", "user"), (req, res) => {
    successResponse(res, "User Login successfully", req.user);
});

router.post("/user", verifyToken, authorizeRole("admin"), createUser);
router.put("/user/:id", verifyToken, authorizeRole("admin", "staff"), updateUser);
router.get("/users", verifyToken, authorizeRole("admin"), getAllUsers);
router.get("/user/:id", verifyToken, authorizeRole("admin", "staff", "user"), getUserById);
router.delete("/user/:id", verifyToken, authorizeRole("admin"), deleteUser);


export default router;
