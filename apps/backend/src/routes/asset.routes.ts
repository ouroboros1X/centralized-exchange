// GET/
// GET / SYMBOL


import express  from "express";
const router  =express.Router();

import {
  userAsset,
  userAssetBySymbol
} from "../../controllers/asset.controllers"

router.route("/asset").get(userAsset)

router.route("/asset/:symbol").get(userAssetBySymbol);


export default router;
