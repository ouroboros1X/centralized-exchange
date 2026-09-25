import type { Request, Response } from "express";

const orderDetails  = (req: Request, res:Response) => {

try {
    res.status(200).json({
      msg:" order details for the user  "
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }

};

const orderUser  = (req: Request, res:Response) => {
try {
    res.status(200).json({
      msg:"user oder succesfully"
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }  

};

const orderByIdUser  = (req: Request, res:Response) => {
try {
    res.status(200).json({
      msg:"oder by id for user "
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }  

};

const deleteOrder  = (req: Request, res:Response) => {
try {
    res.status(200).json({
      msg:"order deleted ssuccesfully"
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }  

};

export { 
  orderDetails,
  orderUser,
  orderByIdUser,
  deleteOrder 
};