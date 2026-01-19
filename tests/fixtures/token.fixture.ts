import dayjs from "dayjs";
import { TokenType } from "../../src/lib/prisma/generated/client";
import tokenService from "../../src/services/token.service";
import { userOne, admin } from "./user.fixture";
import config from "../../src/config/config";

const accessTokenExpires = dayjs().add(
  config.jwt.accessExpirationMinutes as number,
  "minutes"
);

export const userOneAccessToken = tokenService.generateToken(
  userOne.id,
  userOne.role,
  TokenType.ACCESS,
  accessTokenExpires.unix()
);

export const adminAccessToken = tokenService.generateToken(
  admin.id,
  admin.role,
  TokenType.ACCESS,
  accessTokenExpires.unix()
);
