import express from "express";
const router = express.Router();
import { 
  registerUser,
  loginUser,
  logoutUser
 } from "../../controllers/auth.controller";

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/logout").post(logoutUser);


export default router;