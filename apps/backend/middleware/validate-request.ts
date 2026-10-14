
import type { Request, Response, NextFunction } from "express";

export const validateLimitOrder = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { market, side, price, quantity } = req.body ?? {};

  if (
    typeof market !== "string" ||
    !market.trim() ||
    !["BUY", "SELL"].includes(side) ||
    typeof price !== "string" ||
    !/^\d+(\.\d+)?$/.test(price) ||
    typeof quantity !== "string" ||
    !/^\d+(\.\d+)?$/.test(quantity) ||
    Number(price) <= 0 ||
    Number(quantity) <= 0
  ) {
    return res.status(400).json({
      error: "Invalid limit order",
    });
  }

  next();
};
