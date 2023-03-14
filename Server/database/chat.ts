import { PrismaClient } from "@prisma/client";
import { checkUserExistByID } from "./../database/user";
const prisma = new PrismaClient();

export async function existMessage(id: number) {
  return await prisma.chat.findUnique({ where: { id } });
}

export async function writeMessage(
  message: string,
  senderName: string,
  senderID: number,
  takerName: string,
  takerID: number
) {
  const user = await checkUserExistByID(senderID);
  let arr = user?.chattingUserId;
  if (arr?.includes(takerID)) {
    const takerUser = await checkUserExistByID(takerID);
    const uploadUser = await prisma.user.update({
      where: { id: senderID },
      data: { chattingUserId: arr },
    });
    let arr2 = takerUser?.chattingUserId;
    if (arr2?.includes(user!.id)) {
      return await prisma.chat.create({
        data: {
          message,
          sender: senderName,
          senderID,
          taker: takerName,
          takerID,
        },
      });
    } else {
      arr2?.push(user!.id);
      return await prisma.chat.create({
        data: {
          message,
          sender: senderName,
          senderID,
          taker: takerName,
          takerID,
        },
      });
    }
  } else {
    let arr2: any = await checkUserExistByID(takerID);
    arr2 = arr2?.chattingUserId;
    arr?.push(takerID);
    const uploadUser = await prisma.user.update({
      where: { id: senderID },
      data: { chattingUserId: arr },
    });
    const Createdmessage = await prisma.chat.create({
      data: {
        message,
        sender: senderName,
        senderID,
        taker: takerName,
        takerID,
      },
    });
    if (arr2?.includes(user!.id)) {
      return await prisma.chat.create({
        data: {
          message,
          sender: senderName,
          senderID,
          taker: takerName,
          takerID,
        },
      });
    } else {
      arr2?.push(user!.id);
      return await prisma.chat.create({
        data: {
          message,
          sender: senderName,
          senderID,
          taker: takerName,
          takerID,
        },
      });
    }
  }
}

export async function getAllMessages() {
  return await prisma.chat.findMany();
}

export async function deleteMessage(id: number) {
  return await prisma.chat.delete({ where: { id } });
}

export async function editMessage(messageID: number, text: string) {
  return await prisma.chat.update({
    data: { message: text },
    where: { id: messageID },
  });
}
