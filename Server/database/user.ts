import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function checkUserExistByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function checkUserExistByID(id: number) {
  return await prisma.user.findUnique({ where: { id } });
}

export async function LOGIN(email: string, password: string) { }

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

export async function getUserSearch(
  name: string,
  surname: string,
  email: string,
  location: string
) {
  if (name && surname && email && location) {
    return await prisma.user.findMany({
      where: { name, surname, email, location },
    });
  } else if (name && surname && email && !location) {
    return await prisma.user.findMany({
      where: { name, surname, email },
    });
  } else if (name && surname && !email && location) {
    return await prisma.user.findMany({
      where: { name, surname, location },
    });
  } else if (name && !surname && email && location) {
    return await prisma.user.findMany({
      where: { name, email, location },
    });
  } else {
    return await prisma.user.findMany({
      where: {
        name: name ? name : "",
        surname: surname ? surname : "",
        email: email ? email : "",
        location: location ? location : "",
      },
    });
  }
}

export async function SaveToArchieve(userId: number, chattingUserID: number) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  let arr = user?.archieve;
  if (!arr?.includes(chattingUserID)) {
    arr?.push(chattingUserID);
    return await prisma.user.update({
      where: { id: userId },
      data: { archieve: arr },
    });
  } else {
    return await prisma.user.findUnique({ where: { id: userId } });
  }
}
export async function removeUserFromArchieve(
  currentUserID: number,
  deletetingUserId: number
) {
  let user = await prisma.user.findUnique({ where: { id: currentUserID } });
  let arr = user?.archieve;
  arr = arr?.filter((userId) => userId !== deletetingUserId);
  return await prisma.user.update({
    where: { id: currentUserID },
    data: { archieve: arr },
  });
}

export async function editUser(userID: number, name: string, surname: string, email: string, password: string) {
  return await prisma.user.update({ where: { id: userID }, data: { name, surname, email, password } })
}