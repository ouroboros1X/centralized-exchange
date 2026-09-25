import express  from "express";
const router  =express.Router();

import {
  userTrade,
  userTradeById
} from "../../controllers/trade.controller"


router.route("/tradeDeails").post(userTrade);

router.route("/TradeDetailsById").post(userTradeById);

export default router;