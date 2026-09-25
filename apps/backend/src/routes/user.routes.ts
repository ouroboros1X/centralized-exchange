import express from "express";
const router = express.Router();


import {
  userRegister,
  userLogin,
  userLogout
} from "../../controllers/user.controller"

router.route("/Register").post(userRegister);
router.route("/login").post(userLogin);
router.route("/login").post(userLogout);
export default router;