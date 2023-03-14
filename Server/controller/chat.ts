import { Request, Response } from "express";
import {
  deleteMessage,
  editMessage,
  existMessage,
  getAllMessages,
  writeMessage,
} from "../database/chat";
import { checkUserExistByID } from "./../database/user";

export async function getExistMessage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const secret = req.header("x-key");
    if (id && secret) {
      if (secret !== process.env.SECRET_ACCES_KEY) {
        res.status(404).json({ message: "You have not got SECRET KEY!" });
      } else {
        const message = await existMessage(+id);
        if (!message) {
          return res
            .status(404)
            .json({ message: "Your message is not exist!" });
        } else {
          const messageExist = await existMessage(+id);
          res.status(200).json({ message: "Message", answer: messageExist });
        }
      }
    } else {
      return res
        .status(404)
        .json({ message: "Your message is not exist: " + id });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function writeMessageToDatabase(req: Request, res: Response) {
  try {
    const { sender, senderID, message, taker, takerID } = req.body;
    if (!sender || !senderID || !message || !taker || !takerID) {
      return res.status(404).json({ message: "Please fill all the gaps!" });
    } else {
      const user = await checkUserExistByID(+senderID);
      const takerUSER = await checkUserExistByID(+takerID);
      if (!user || !takerUSER) {
        return res
          .status(404)
          .json({ message: "Please check your data and try agaian later!" });
      } else {
        const createdMessage = await writeMessage(
          message,
          user.name,
          user.id,
          takerUSER.name,
          takerUSER.id
        );
        res
          .status(201)
          .json({ message: "Message created", created: createdMessage });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function findMessages(req: Request, res: Response) {
  try {
    const secret = req.header("x-key");
    const SECRET_KEY = process.env.SECRET_ACCES_KEY;
    if (secret !== SECRET_KEY) {
      return res
        .status(401)
        .json({ message: "You are not allowed to see messages!" });
    } else {
      const messages = await getAllMessages();
      return res.status(200).json({ message: "All messages", messages });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deletedMessageByID(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    if (!userID) {
      return res.status(400).json({ message: "You have some problmes!" });
    }
    const user = await checkUserExistByID(+userID);
    if (!user) {
      return res.status(400).json({ message: "You have some problmes!" });
    } else {
      const { messageID } = req.body;
      if (!messageID) {
        return res.status(400).json({ message: "You have some problmes!" });
      } else {
        const message = await existMessage(+messageID);
        if (!message) {
          return res.status(400).json({ message: "You have some problmes!" });
        } else {
          const deletedMessage = await deleteMessage(message.id);
          res
            .status(200)
            .json({ message: "Deleted succesfully", deleted: deletedMessage });
        }
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function editExistMessage(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    if (!userID) {
      return res.status(400).json({ message: "You have some problmes!" });
    }
    const user = await checkUserExistByID(+userID);
    if (!user) {
      return res.status(400).json({ message: "You have some problmes!" });
    } else {
      let { messageID, message:another } = req.body;
      if (!messageID) {
        return res.status(400).json({ message: "You have some problmes!" });
      } else {
        const message = await existMessage(+messageID);
        if (!message) {
          return res.status(400).json({ message: "You have some problmes!" });
        } else {
          const editedMessage = await editMessage(message.id, another);
          res.status(200).json({
            message: "Updated succesfully",
            updatedMessage: editedMessage,
          });
        }
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
