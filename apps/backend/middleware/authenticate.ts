
import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../services/auth.service";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;
    const token = header?.startsWith("Bearer ")
      ? header.slice(7)
      : undefined;

    if (!token) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    const user = await verifyAccessToken(token);

    if (!user) {
      return res.status(401).json({
        error: "Invalid or expired token",
      });
    }

    res.locals.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
