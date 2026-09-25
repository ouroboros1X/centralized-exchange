import type {Request , Response} from "express";

const registerUser = (req:Request, res:Response) =>{

  res.status(200).json ({msg:"user registerd succesfully"})
};

const loginUser = (req:Request, res:Response) =>{

  res.status(200).json ({msg:"user login succesfully"})
};

const logoutUser = (req:Request, res:Response) =>{

  res.status(200).json ({msg:"user logout succesfull"})
};


export {
  registerUser,
  loginUser,
  logoutUser
};