


import express from "express";
const router = express.Router();
import { 
  orderDetails,
  orderUser,
  orderByIdUser,
  deleteOrder

 } from "../../controllers/order.controller";

router.route("/orderdetails").get(orderDetails);

router.route("/order").get(orderUser);

router.route("/order/:id").post(orderByIdUser);

router.route("/deleteOrder/:id").post(deleteOrder);

export default router;