

import express  from "express";
const router  =express.Router();

import {
  userBalence,
  userBalenceSymbol
} from "../../controllers/wallet.controller"


router.route("/walletBalence").get(userBalence);

router.route("/walletBalence/:symbol").get(userBalenceSymbol);

export default router;