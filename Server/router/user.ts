import { Router } from "express";
import {
  checkTokenValid,
  deleteArchivedUser,
  deleteUserById,
  findArchievedUsers,
  getAllUsers,
  getUserById,
  getUserBySearch,
  postForArchieve,
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
router.post("/saveArchieve/", postForArchieve);
router.get("/archivedUsers", findArchievedUsers);
router.delete("/archieve", deleteArchivedUser);
router.get("/:id",getUserById)
export default router;
