import {
  CREATE_USERS,
  READ_USERS,
  UPDATE_USERS,
  DELETE_USERS
} from "./permission.constants.js";

import { Role } from "@prisma-client";

export const ROLE_PRIVILEGES: Record<Role, string[]> = {
  [Role.USER]: [],
  [Role.ADMIN]: [CREATE_USERS, READ_USERS, UPDATE_USERS, DELETE_USERS]
};
