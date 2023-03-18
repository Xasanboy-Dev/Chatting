import e, { Router, Request, Response } from "express";
import events from "events";
import {
  deletedMessageByID,
  editExistMessage,
  findMessages,
  getExistMessage,
  writeMessageToDatabase,
} from "../controller/chat";
const router = Router();
const emmiter = new events.EventEmitter();
// router.post("/text", writeMessageToDatabase);
// router.get("/text/:id", getExistMessage);
// router.get("/text", findMessages);
// router.delete("/text/:userID", deletedMessageByID);
// router.put("/text/:userID", editExistMessage);

router.get(`get-message`, (req: Request, res: Response): void => {
  emmiter.once("newMessage", (message: string) => {
    res.status(200).json({ message });
  });
});

router.post("newMessage", (req: Request, res: Response) => {
  const message = req.body;
  emmiter.emit("newMessage", message);
  res.status(201).json({ message: "Message has sended!" });
});

export default router;
