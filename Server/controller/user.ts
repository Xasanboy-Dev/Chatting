import { Request, Response } from "express";
import { Verify } from "./../database/token";
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
    const users = await findUsers();
    res.status(200).json({ message: "All users", users });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteUserById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const secret = req.header("x-key");
    if (!secret || !id) {
      return res.status(401).json({ message: "You have some problems!" });
    } else {
      const SECRET = process.env.SECRET_ACCES_KEY;
      if (secret !== SECRET) {
        return res.status(401).json({ message: "You have some problems!" });
      } else {
        const user = await checkUserExistByID(+id);
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

export async function getUserBySearch(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    if (userID) {
      const user = await checkUserExistByID(+userID);
      if (user) {
        const {
          name,
          surname,
          email,
          location,
        }: { name: string; surname: string; email: string; location: string } =
          req.body;
      } else {
        return res.status(401).json({ message: "You must to login!" });
      }
    } else {
      return res.status(401).json({ message: "You must to login!" });
    }
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function checkTokenValid(req: Request, res: Response) {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(401).json({ message: "User not authorized!" });
    } else {
      try {
        const result = await Verify(token);
        res.status(200).json({ message: "Successfully!", user: result });
      } catch (error: any) {
        console.log(error.message);
        return res.status(401).json({ message: "User not authorized!" });
      }
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal error" });
  }
}
