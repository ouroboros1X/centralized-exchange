import express  from "express";
const router  =express.Router();

import {
  getMarketDetails,
  getMarketDetailsBySymbol
  
} from "../../controllers/market.controller"


router.route("/marketDetails").get(getMarketDetails);

router.route("/marketDetails/:symbol").get(getMarketDetailsBySymbol);

export default router;