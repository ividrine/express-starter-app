import * as z from "zod";
import { EMAIL, PASSWORD, TOKEN } from "../constants/validate.constants.js";

const register = {
  body: z.object({
    email: EMAIL,
    password: PASSWORD
  })
};

const login = {
  body: z.object({
    email: EMAIL,
    password: PASSWORD
  })
};

const logout = {
  body: z.object({ refreshToken: TOKEN })
};

const refreshTokens = {
  body: z.object({ refreshToken: TOKEN })
};

const forgotPassword = {
  body: z.object({ email: EMAIL })
};

const resetPassword = {
  query: z.object({ token: TOKEN }),
  body: z.object({ password: PASSWORD })
};

const verifyEmail = {
  query: z.object({ token: TOKEN })
};

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail
};
