// post 
// get 
// get :id 
// delete :id 


import express from "express";
const router = express.Router();
import { 
  orderDetails
  
 } from "../../controllers/order.controller";

router.route("/orderdetails").get(orderDetails);

router.route("/order").get(orderUser);

router.route("/order/:id").post(orderByIdUser);

router.route("/deleteOrder/:id").post(deleteOrder);

export default router;