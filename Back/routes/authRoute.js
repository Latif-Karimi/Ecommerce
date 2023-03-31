import express from "express";
import { registerControler,loginControler,testController } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// Create a router object
const router = express.Router();

// Register || Method post
router.post("/register", registerControler);

//Login || POST
router.post("/login", loginControler)

//test Route
router.get("/test",requireSignIn,isAdmin, testController)

export default router;
