import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUserExistByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function checkUserExistByID(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function LOGIN(email: string, password: string) {}

export async function Register(
  name: string,
  surname: string,
  email: string,
  password: string
) {
  const data = {
    name,
    email,
    surname,
    password,
  };
  return await prisma.user.create({ data });
}

export async function findUsers() {
  return await prisma.user.findMany();
}

export async function removeUserById(id: number) {
  return await prisma.user.delete({ where: { id } });
}
