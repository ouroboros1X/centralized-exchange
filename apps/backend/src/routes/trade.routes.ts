import express  from "express";
const router  =express.Router();

import {
  userTrade,
  userTradeById
} from "../../controllers/trade.controller"


router.route("/tradeDeails").get(userTrade);

router.route("/TradeDetailsById").get(userTradeById);

export default router;