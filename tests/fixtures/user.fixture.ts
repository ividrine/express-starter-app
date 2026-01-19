import { faker } from "@faker-js/faker";
import { Role, User } from "../../src/lib/prisma/generated/client";
import prisma from "../../src/lib/prisma";
import bcrypt from "bcrypt";

const password = "password1";
const salt = bcrypt.genSaltSync(10);
const hashedPassword = bcrypt.hashSync(password, salt);

export const userOne = {
  id: "1",
  email: faker.internet.email().toLowerCase(),
  password,
  role: Role.USER,
  isEmailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const userTwo = {
  id: "2",
  email: faker.internet.email().toLowerCase(),
  password,
  role: Role.USER,
  isEmailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const admin = {
  id: "3",
  email: faker.internet.email().toLowerCase(),
  password,
  role: Role.ADMIN,
  isEmailVerified: false,
  createdAt: new Date(),
  updatedAt: new Date()
};

export const insertUsers = async (users: User[]) => {
  await prisma.user.createMany({
    data: users.map((user: User) => ({ ...user, password: hashedPassword }))
  });
};
