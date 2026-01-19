/* eslint-disable no-console */
import prisma from "../src/lib/prisma/index";
import { Role } from "../src/lib/prisma/generated/client";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

async function main() {
  const totalUsers = 100;
  const hashedPassword = await bcrypt.hash("password123", 10);
  const admin = {
    email: "admin@app.com",
    password: hashedPassword,
    role: Role.ADMIN
  };

  if (await prisma.user.findUnique({ where: { email: admin.email } })) {
    console.log("Database already seeded.");
    return;
  }

  const users = Array.from({ length: totalUsers }).map(() => ({
    email: faker.internet.email(),
    role: Role.USER,
    password: hashedPassword,
    createdAt: faker.date.past(),
    updatedAt: new Date()
  }));

  await prisma.user.create({ data: admin });

  await prisma.user.createMany({
    data: users,
    skipDuplicates: true
  });

  console.log("Seed data inserted");
}

main()
  .catch((err) => {
    console.log(err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
