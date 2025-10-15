import httpStatus from "http-status";
import ApiError from "../utils/ApiError.js";
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { RequestSchema } from "../types/request.type.js";

const validate =
  (schema: RequestSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      res.locals.input = {
        params: schema.params ? schema.params?.parse(req.params) : undefined,
        query: schema.query ? schema.query.parse(req.query) : undefined,
        body: schema.body ? schema.body.parse(req.body) : undefined
      };
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        next(
          new ApiError(
            httpStatus.BAD_REQUEST,
            err.issues.length > 0 ? err.issues[0].message : "Invalid request"
          )
        );
      } else {
        next(err);
      }
    }
  };

export default validate;
