import { Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  postLogin,
  postRegister,
} from "../controller/user";

const router = Router();

router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/users", getAllUsers);
router.delete("/:id", deleteUserById);
router.post("/user/:userID",);
export default router;
