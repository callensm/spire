import { Router } from 'express'
import { UserController } from '../controllers'

const router = Router()
router.get('/', UserController.getUsers)
router.post('/', UserController.createUser)
router.get('/:id', UserController.findById)
router.delete('/:id', UserController.deleteUser)
router.get('/admins', UserController.findAdmins)

export default router
