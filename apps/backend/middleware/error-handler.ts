
import type {
  Request,
  Response,
  NextFunction,
} from "express";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error("Request failed:", err);

  return res.status(500).json({
    error: "Internal server error",
  });
};
