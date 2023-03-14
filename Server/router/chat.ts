import { Router } from "express";
import {
  deletedMessageByID,
  editExistMessage,
  findMessages,
  getExistMessage,
  writeMessageToDatabase,
} from "../controller/chat";
const router = Router();

router.post("/text", writeMessageToDatabase);
router.get("/text/:id", getExistMessage);
router.get("/text", findMessages);
router.delete("/text/:userID", deletedMessageByID);
router.put("/text/:userID", editExistMessage);

export default router;
