
import type { Request, Response, NextFunction } from "express";
import { randomUUID } from "node:crypto";

export const requestId = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = randomUUID();

  res.setHeader("X-Request-ID", id);
  next();
};
