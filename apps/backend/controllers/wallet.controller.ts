import type {Request, Response} from "express";


const userBalence = (req:Request ,  res:Response) => {
  try { 
    res.status(200).json({
      msg: "user Registred Succesfully"
    })
  } catch (error)  {
    res.status(200).json({
      error:error
    });
  }
}


const  userBalenceSymbol = (req:Request ,  res:Response) => {
  try { 
    res.status(200).json({
      msg: "user Registred Succesfully"
    })
  } catch (error)  {
    res.status(200).json({
      error:error
    });
  }
}

export {
  userBalence,
  userBalenceSymbol

};