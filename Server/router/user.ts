import { Router } from 'express'
import {
    checkTokenValid,
    deleteArchivedUser,
    deleteUserById,
    editUserById,
    getAllUsers,
    getArchievedUsers,
    getUserById,
    getUserBySearch,
    postForArchieve,
    postLogin,
    postRegister,
} from '../controller/user'

const router = Router()

router.post('/login', postLogin)
router.post('/register', postRegister)
router.get('/users', getAllUsers)
router.delete('/archieve', deleteArchivedUser)
router.delete('/:id', deleteUserById)
router.post('/user/:userID', getUserBySearch)
router.post('/token', checkTokenValid)
router.post('/saveArchieve/', postForArchieve)
router.get('/archivedUsers', getArchievedUsers)
router.get('/:id', getUserById)
router.put('/:id', editUserById)
export default router
