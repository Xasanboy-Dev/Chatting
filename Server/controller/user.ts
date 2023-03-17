import { Request, Response } from 'express'
import { Verify } from './../database/token'
import { Sign } from '../database/token'
import {
    checkUserExistByEmail,
    checkUserExistByID,
    editUser,
    findUsers,
    Register,
    removeUserById,
    removeUserFromArchieve,
    SaveToArchieve,
} from '../database/user'
import { user } from '@prisma/client'

export async function postLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res
                .status(404)
                .json({ message: 'Please fill all the gaps!' })
        }
        const userExist = await checkUserExistByEmail(email)
        if (!userExist) {
            return res.status(404).json({ message: 'User is not exist!' })
        } else {
            if (userExist.password !== password) {
                return res
                    .status(404)
                    .json({ message: 'You have some problems!' })
            } else {
                const token = await Sign(
                    userExist.name,
                    userExist.surname,
                    userExist.email,
                    userExist.archieve,
                    userExist.id
                )
                res.status(200).json({
                    message: 'Bear',
                    token,
                    userID: userExist.id,
                })
            }
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function postRegister(req: Request, res: Response) {
    try {
        const { email, password, name, surname } = req.body
        if (!email || !password || !name || !surname) {
            return res
                .status(404)
                .json({ message: 'Please fill all the gaps!' })
        }
        const userExist = await checkUserExistByEmail(email)
        if (!userExist) {
            const user = await Register(name, surname, email, password)
            res.status(201).json({ message: 'User created succesfully!', user })
        } else {
            return res.status(409).json({ message: 'User already exist!' })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await findUsers()
        res.status(200).json({ message: 'All users', users })
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function deleteUserById(req: Request, res: Response) {
    try {
        const { id } = req.params
        const secret = req.header('x-key')
        if (!secret || !id) {
            return res.status(401).json({ message: 'You have some problems!' })
        } else {
            const SECRET = process.env.SECRET_ACCES_KEY
            if (secret !== SECRET) {
                return res
                    .status(401)
                    .json({ message: 'You have some problems!' })
            } else {
                const user = await checkUserExistByID(+id)
                if (!user) {
                    return res
                        .status(401)
                        .json({ message: 'You have some problems!' })
                } else {
                    const removedUser = await removeUserById(user.id)
                    return res.status(200).json({
                        message: 'Deleted succesfully',
                        user: removedUser,
                    })
                }
            }
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function getUserBySearch(req: Request, res: Response) {
    try {
        const { userID } = req.params
        if (userID) {
            const user = await checkUserExistByID(+userID)
            if (user) {
                const {
                    name,
                    surname,
                    email,
                    location,
                }: {
                    name: string
                    surname: string
                    email: string
                    location: string
                } = req.body
            } else {
                return res.status(401).json({ message: 'You must to login!' })
            }
        } else {
            return res.status(401).json({ message: 'You must to login!' })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function checkTokenValid(req: Request, res: Response) {
    try {
        const { token } = req.body
        if (!token) {
            return res.status(401).json({ message: 'User not authorized!' })
        } else {
            try {
                const result = Verify(token)
                return res
                    .status(200)
                    .json({ message: 'Successfully!', user: result })
            } catch (error: any) {
                console.log(error.message)
                return res.status(401).json({ message: 'User not authorized!' })
            }
        }
    } catch (error: any) {
        console.log(error.message)
        return res.status(500).json({ message: 'Internal error' })
    }
}

export async function postForArchieve(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { ID, chattingUser } = req.body
        if (token && ID && chattingUser) {
            const ValidToken = Verify(token)
            if (ValidToken) {
                const user = await checkUserExistByID(+ID)
                const chatting = await checkUserExistByID(+chattingUser)
                if (user && chatting) {
                    const Archieve = await SaveToArchieve(user.id, chatting.id)
                    return res
                        .status(201)
                        .json({ message: 'Added succefully!' })
                } else {
                    return res
                        .status(404)
                        .json({ message: 'User is not exist!' })
                }
            } else {
                return res.status(401).json({ message: 'You must to login!' })
            }
        } else {
            return res.status(401).json({ message: 'You must to login!' })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}
export async function deleteArchivedUser(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const deletingUserID = req.headers.accept
        if (token && deletingUserID) {
            const ValidToken: any = Verify(token)
            if (ValidToken) {
                const userID = ValidToken.id
                const user = await checkUserExistByID(userID)
                if (user) {
                    const deleteExist = await checkUserExistByID(
                        +deletingUserID
                    )
                    if (deleteExist) {
                        const deletedArchieve = await removeUserFromArchieve(
                            userID,
                            +deletingUserID
                        )
                        return res.status(200).json({
                            message: 'Deleted succesfully!',
                            user: deletedArchieve,
                        })
                    } else {
                        return res
                            .status(404)
                            .json({ message: 'User not found!' })
                    }
                } else {
                    return res.status(404).json({ message: 'User not found!' })
                }
            } else {
                return res.status(401).json({ message: 'You must to login!' })
            }
        } else {
            return res.status(401).json({ message: 'You must to login!' })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}
export async function getUserById(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const { id } = req.params
        if (token && id) {
            const ValidateToken = Verify(token)
            if (ValidateToken) {
                const user = await checkUserExistByID(+id)
                if (user) {
                    return res.status(200).json({ message: 'User', user })
                } else {
                    return res.status(404).json({ message: 'User not found!' })
                }
            } else {
                return res.status(401).json({ message: 'You must to login!' })
            }
        } else {
            return res.status(401).json({ message: 'You must to login!' })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function editUserById(req: Request, res: Response) {
    try {
        const { id } = req.params
        if (id) {
            const { name, lastname, email, password } = req.body
            const user = await checkUserExistByID(+id)
            if (user) {
                if (email) {
                    const checkUserByEmail = await checkUserExistByEmail(email)
                    if (checkUserByEmail?.id !== user.id) {
                        return res
                            .status(409)
                            .json({ message: `Your email is already exist!` })
                    } else {
                        await editUser(user.id, name, lastname, email, password)
                        return res.status(200).json({
                            message: 'Edited succesfully!',
                            user: { name, lastname, email, id },
                        })
                    }
                } else {
                    await editUser(user.id, name, lastname, email, password)
                    return res.status(200).json({
                        message: 'Edited succesfully!',
                        user: { name, lastname, email, id },
                    })
                }
            } else {
                return res.status(404).json({ message: 'User not found!' })
            }
        } else {
            return res.status(401).json({ message: 'You must to login!' })
        }
    } catch (error: any) {
        console.log(error.message)
        res.status(500).json({ message: 'Internal error' })
    }
}

export async function getArchievedUsers(req: Request, res: Response) {
    try {
        const token = req.headers.authorization
        const userID = req.headers.accept
        if (token && userID) {
            const ValidToken: any = Verify(token)
            const user = await checkUserExistByID(+userID)
            if (ValidToken && user) {
                let archivedUsersID: number[] = user.archieve
                const allUsers: user[] = []
                for (let i in archivedUsersID) {
                    const user = await checkUserExistByID(archivedUsersID[i])
                    if (user) {
                        allUsers.push(user)
                    }
                }
                return res
                    .status(200)
                    .json({ message: 'All archived users!', users: allUsers })
            } else {
                return res.status(401).json({ message: 'You must to LOGIN!' })
            }
        } else {
            return res.status(401).json({ message: 'You must to LOGIN!' })
        }
    } catch (error: any) {
        console.log(error.mesage)
        res.status(500).json({ message: 'Internal error' })
    }
}
