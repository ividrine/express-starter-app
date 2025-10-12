import * as z from "zod";
import {
  EMAIL_REQUIRED_ERROR,
  EMAIL_INVALID_ERROR,
  PW_LENGTH_ERROR,
  PW_PATTERN_ERROR,
  PW_REQUIRED_ERROR,
  INVALID_TOKEN_ERROR
} from "./error.constants.js";

export const EMAIL = z.email({
  error: (iss) =>
    iss.input === undefined ? EMAIL_REQUIRED_ERROR : EMAIL_INVALID_ERROR
});

export const PASSWORD = z
  .string(PW_REQUIRED_ERROR)
  .min(8, PW_LENGTH_ERROR)
  .refine((password) => password.match(/\d/) && password.match(/[a-zA-Z]/), {
    message: PW_PATTERN_ERROR
  });

export const PASSWORD_RELAXED = z.string().min(1, PW_REQUIRED_ERROR);

export const TOKEN = z.string(INVALID_TOKEN_ERROR).min(1, INVALID_TOKEN_ERROR);
