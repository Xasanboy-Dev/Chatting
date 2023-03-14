import { Request, Response } from "express";
import { Sign } from "../database/token";
import {
  checkUserExistByEmail,
  checkUserExistByID,
  findUsers,
  Register,
  removeUserById,
} from "../database/user";

export async function postLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json({ message: "Please fill all the gaps!" });
    }
    const userExist = await checkUserExistByEmail(email);
    if (!userExist) {
      return res.status(404).json({ message: "User is not exist!" });
    } else {
      if (userExist.password !== password) {
        return res.status(404).json({ message: "You have some problems!" });
      } else {
        const token = await Sign(
          userExist.name,
          userExist.surname,
          userExist.email,
          userExist.id
        );
        res.status(200).json({ message: "Bear", token });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function postRegister(req: Request, res: Response) {
  try {
    const { email, password, name, surname } = req.body;
    if (!email || !password || !name || !surname) {
      return res.status(404).json({ message: "Please fill all the gaps!" });
    }
    const userExist = await checkUserExistByEmail(email);
    if (!userExist) {
      const user = await Register(name, surname, email, password);
      res.status(201).json({ message: "User created succesfully!", user });
    } else {
      return res.status(409).json({ message: "User already exist!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const SECRET = process.env.SECRET_ACCES_KEY;
    const secret = req.header("x-key");
    if (secret !== SECRET) {
      return res.status(404).json({ message: "You have not got secret key!" });
    } else {
      const users = await findUsers();
      res.status(200).json({ message: "All users", users });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const { usserID: userID } = req.params;
    const secret = req.header("x-keey");
    if (!secret || userID) {
      return res.status(401).json({ message: "You have some problems!" });
    } else {
      if (secret !== process.env.SECRET_ACCES_KEY) {
        return res.status(401).json({ message: "You have some problems!" });
      } else {
        const user = await checkUserExistByID(+userID);
        if (!user) {
          return res.status(401).json({ message: "You have some problems!" });
        } else {
          const removedUser = await removeUserById(user.id);
          return res
            .status(200)
            .json({ message: "Deleted succesfully", user: removedUser });
        }
      }
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
