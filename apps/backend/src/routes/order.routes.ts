


import express from "express";
const router = express.Router();
import { 
  orderDetails,
  orderUser,
  orderByIdUser,
  deleteOrder

 } from "../../controllers/order.controller";

router.route("/orderdetails").post(orderDetails);

router.route("/order").get(orderUser);

router.route("/order/:id").get(orderByIdUser);

router.route("/deleteOrder/:id").delete(deleteOrder);

export default router;