import express from "express";
import { registerControler,loginControler,testController,forgotPasswordControler } from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";


// Create a router object
const router = express.Router();

// Register || Method post
router.post("/register", registerControler);

//Login || POST
router.post("/login", loginControler)

//Forgot password || POST
router.post('/forgot-password',forgotPasswordControler)

//test Route
router.get("/test",requireSignIn,isAdmin, testController)

//protected Route auth dahshboard
router.get('/user-auth',requireSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

export default router;
