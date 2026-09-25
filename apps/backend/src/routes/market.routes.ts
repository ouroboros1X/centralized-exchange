import express  from "express";
const router  =express.Router();

import {
  getMarketDetails,
  getMarketDetailsBySymbol
  
} from "../../controllers/market.controller"


router.route("/marketDetails").post(getMarketDetails);

router.route("/marketDetails/:symbol").post(getMarketDetailsBySymbol);

export default router;