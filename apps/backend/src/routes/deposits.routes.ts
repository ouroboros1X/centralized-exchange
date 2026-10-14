import express  from "express";
const router  =express.Router();

import {
  depositeUser,
  depositeUserupdated
  
} from "../../controllers/deposits.controllers"


router.route("/deposite").post(depositeUser);

router.route("/deposite").get(depositeUserupdated);

export default router;

