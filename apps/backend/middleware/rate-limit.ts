
import type { Request, Response, NextFunction } from "express";

const requests = new Map<string, { count: number; resetAt: number }>();

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 100;

export const rateLimit = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const key = req.ip ?? "unknown";
  const now = Date.now();

  let entry = requests.get(key);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + WINDOW_MS };
    requests.set(key, entry);
  }

  entry.count++;

  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests",
    });
  }

  next();
};
