import type { Request, Response } from "express";

const orderDetails  = (req: Request, res:Response) => {


  res.status(200).json ({msg:"testing ok"});
};

const orderUser  = (req: Request, res:Response) => {
  

  res.status(200).json ({msg:"testing ok"});
};

const orderByIdUser  = (req: Request, res:Response) => {
  

  res.status(200).json ({msg:"testing ok"});
};

const deleteOrder  = (req: Request, res:Response) => {
  

  res.status(200).json ({msg:"testing ok"});
};

export { orderDetails };