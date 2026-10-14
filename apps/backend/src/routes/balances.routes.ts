
import express  from "express";
const router  =express.Router();

import {
  userBalence,
  userBalenceAsset
} from "../../controllers/balances.controllers"


router.route("/balence").get(userBalence);

router.route("/balence/:asset").get(userBalenceAsset);

export default router;