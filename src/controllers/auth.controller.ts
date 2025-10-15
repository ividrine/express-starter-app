import httpStatus from "http-status";
import catchAsync from "../utils/catchAsync.js";
import {
  authService,
  userService,
  tokenService,
  emailService
} from "../services/index.js";
import { Role } from "@prisma/client";
import ApiError from "../utils/ApiError.js";
import { AuthRequest } from "../types/request.type.js";

const register = catchAsync(async (req, res) => {
  const { body } = res.locals.input;
  const user = await userService.createUser(body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

const login = catchAsync(async (req, res) => {
  const { email, password } = res.locals.input.body;
  const user = await authService.loginWithPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ tokens, user });
});

const logout = catchAsync(async (req, res) => {
  const { refreshToken } = res.locals.input.body;
  await authService.logout(refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const { refreshToken } = res.locals.input.body;
  const tokens = await authService.refreshAuth(refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const { email } = res.locals.input.body;
  const resetPasswordToken =
    await tokenService.generateResetPasswordToken(email);
  await emailService.sendResetPasswordEmail(email, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  const { token } = res.locals.input.query;
  const { password } = res.locals.input.body;
  await authService.resetPassword(token, password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const { sub, role } = (req as AuthRequest).auth?.payload;
  const user = await userService.getUserById(sub as string);

  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Email verification failed");
  }

  const verifyEmailToken = await tokenService.generateVerifyEmailToken(
    sub as string,
    role as Role
  );

  await emailService.sendVerificationEmail(
    user.email as string,
    verifyEmailToken
  );
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  const { token } = res.locals.input.query;
  await authService.verifyEmail(token);
  res.status(httpStatus.NO_CONTENT).send();
});

export default {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail
};
