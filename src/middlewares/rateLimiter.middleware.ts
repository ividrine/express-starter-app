import { Request, Response, NextFunction } from "express";
import { RateLimiterPrisma, RateLimiterRes } from "rate-limiter-flexible";
import httpStatus from "http-status";
import prisma from "@prisma-instance";
import ApiError from "@/utils/ApiError";

const rateLimiterPrisma = new RateLimiterPrisma({
  storeClient: prisma,
  keyPrefix: "middleware",
  points: 10, // 50 requests
  duration: 1 // per 5 seconds by IP
});

export async function rateLimiter(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await rateLimiterPrisma.consume(req.ip as string);
    next();
  } catch (err) {
    if (err instanceof RateLimiterRes) {
      const secs = Math.round(err.msBeforeNext / 1000) || 1;
      res.set("Retry-After", String(secs));
      return next(
        new ApiError(httpStatus.TOO_MANY_REQUESTS, "Too Many Requests")
      );
    } else {
      next(err);
    }
  }
}
