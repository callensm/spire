import { Router } from 'express'
import { TagController } from '../controllers'

const router = Router()
router.get('/', TagController.getTags)
router.post('/', TagController.createTag)
router.get('/:id', TagController.findById)
router.get('/find/:text', TagController.findByText)

export default router
