
import type{Request , Response} from "express";


const userTrade = (req:Request, res:Response) =>{

  res.status(200).json({msg:"this is users trade Details"});
};

const userTradeById = (req:Request, res:Response) => {
  res.status(200).json({msg:"this is the users trade details ny ID"});
};


export {
  userTrade,
  userTradeById
};