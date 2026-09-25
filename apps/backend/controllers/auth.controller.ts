import type {Request , Response} from "express";

const registerUser = (req:Request, res:Response) =>{
  try {
    res.status(200).json({
      msg:"user registerd succesfully"
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }
};

const loginUser = (req:Request, res:Response) =>{
  try {
    res.status(200).json({
      msg:"user login succesfully"
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }
};

const logoutUser = (req:Request, res:Response) =>{
  try {
    res.status(200).json({
      msg:"user logout succesfull"
    });
  } catch (error){
    res.status(200).json({
      error:error
    })
  }
};


export {
  registerUser,
  loginUser,
  logoutUser
};