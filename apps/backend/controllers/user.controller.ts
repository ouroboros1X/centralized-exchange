import type {Request, Response} from "express";


const userRegister = (req:Request ,  res:Response) => {
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

const userLogin = (req:Request ,  res:Response) => {
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

const userLogout = (req:Request ,  res:Response) => {
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
  userRegister,
  userLogin,
  userLogout
};