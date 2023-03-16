import { Router } from "express";
import {
  checkTokenValid,
  deleteUserById,
  getAllUsers,
  getUserBySearch,
  postLogin,
  postRegister,
} from "../controller/user";

const router = Router();

router.post("/login", postLogin);
router.post("/register", postRegister);
router.get("/users", getAllUsers);
router.delete("/:id", deleteUserById);
router.post("/user/:userID", getUserBySearch);
router.post("/token", checkTokenValid);
export default router;
