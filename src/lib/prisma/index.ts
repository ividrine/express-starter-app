import { PrismaClient } from "@prisma-client";
import { PrismaPg } from "@prisma/adapter-pg";
import config from "../../config/config";
import paginateExtension from "./extensions/paginate.js";

const adapter = new PrismaPg({
  connectionString: config.database_url
});

const prismaClient = new PrismaClient({
  adapter,
  omit: {
    user: {
      password: true,
      createdAt: true,
      updatedAt: true
    },
    token: {
      createdAt: true,
      updatedAt: true
    }
  }
});

const prisma = prismaClient.$extends(paginateExtension);

export const initSql = async () => {
  await prismaClient.$connect();
};

export const closeSql = async () => {
  await prismaClient.$disconnect();
};

export default prisma;
