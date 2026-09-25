
import type{Request , Response} from "express";


const getMarketDetails = (req: Request, res: Response) => {
    try {
        res.status(200).json({
            msg: "this is the users trade details"
        });
    } catch (error) {
        res.status(500).json({
            error: error
        });
    }
};

const getMarketDetailsBySymbol = (req:Request, res:Response)=>{
  try{
    res.status(200).json({
      msg: "this is the user trade details by symbol"
    });
  } catch (error) {
    res.status(200).json({
      error : error
    });
  }
}



export {
  getMarketDetails,
  getMarketDetailsBySymbol
};  