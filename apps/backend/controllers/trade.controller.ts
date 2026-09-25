
import type{Request , Response} from "express";


const userTrade = (req:Request, res:Response) =>{
  try {
    res.status(200).json({
      msg:"this is users trade Details"
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }
};

const userTradeById = (req:Request, res:Response) => {
  try {
    res.status(200).json({
      msg:"this is the users trade details ny ID"
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }
};


export {
  userTrade,
  userTradeById
};