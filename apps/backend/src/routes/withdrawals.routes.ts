import express  from "express";
const router  = express.Router();

import {
  userWithdrawals,
  userWithdrawalsUpdated
} from "../../controllers/withdrawals.controllers"

router.route("/balence").post(userWithdrawals)

router.route("/balence").get(userWithdrawalsUpdated);


export default router;
