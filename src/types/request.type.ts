import type { ZodType } from "zod";
import type { Request } from "express";
import type { AuthPayload } from "./jwt.type.js";

export type RequestSchema = {
  params?: ZodType;
  query?: ZodType;
  body?: ZodType;
  headers?: ZodType;
};

export type AuthRequest = Request & { auth: { payload: AuthPayload } };
