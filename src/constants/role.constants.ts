import {
  CREATE_USERS,
  READ_USERS,
  UPDATE_USERS,
  DELETE_USERS
} from "./permission.constants.js";

import { Role } from "@prisma/client";

export const ROLE_PRIVILEGES = {
  [Role.USER]: [] as string[],
  [Role.ADMIN]: [CREATE_USERS, READ_USERS, UPDATE_USERS, DELETE_USERS]
};
